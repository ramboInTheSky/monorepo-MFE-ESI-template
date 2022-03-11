##################################################
# Resource Group

resource "azurerm_resource_group" "ui" {
  name     = local.resource_group_name
  location = var.location
  tags     = local.resource_tags
}

module "app_permissions" {
  depends_on       = [azurerm_resource_group.ui]
  source           = "git::https://dev.azure.com/Amido.Ecommerce.Infrastructure/_git/Amido.Ecommerce.Infrastructure.Modules//terraform/azure/apppermissions"
  resourcegroup_id = azurerm_resource_group.ui.id
  domain_group     = var.ad_domain
  environment      = var.name_environment
}

##################################################
# Backend Content Storage - ui
resource "azurerm_storage_account" "cdn_ui_content_storage" {
  name                      = local.cdn_storage_name
  resource_group_name       = azurerm_resource_group.ui.name
  location                  = var.location
  account_tier              = "Standard"
  account_replication_type  = "GZRS"
  allow_blob_public_access  = true
  enable_https_traffic_only = true
  min_tls_version           = "TLS1_2"
  tags                      = local.resource_tags
}

# Health check container
resource "azurerm_storage_container" "storage_health" {
  name                  = var.health_container
  storage_account_name  = azurerm_storage_account.cdn_ui_content_storage.name
  container_access_type = "blob"
}

# Static content container for CDN
resource "azurerm_storage_container" "ui_content" {
  name                  = var.content_container
  storage_account_name  = azurerm_storage_account.cdn_ui_content_storage.name
  container_access_type = "blob"
}

# Front door storage health check file
resource "azurerm_storage_blob" "icons_content_path_health_check_file" {
  name                   = "${var.icons_content_path}/healthz.html"
  storage_account_name   = azurerm_storage_account.cdn_ui_content_storage.name
  storage_container_name = azurerm_storage_container.storage_health.name
  type                   = "Block"
  content_type           = "text/html"
  source                 = "data/health/healthz.html"
}

##################################################
# KeyVault Resource
##################################################

resource "azurerm_key_vault" "vault" {
  name                = local.key_vault_name
  location            = azurerm_resource_group.ui.location
  resource_group_name = azurerm_resource_group.ui.name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"
  tags                = azurerm_resource_group.ui.tags
}

##################################################
# KeyVault Access Policies
##################################################

# Used to ensure that Terraform itself can get/list/set/delete secrets after it has created the vault
resource "azurerm_key_vault_access_policy" "service_principal" {
  key_vault_id = azurerm_key_vault.vault.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  secret_permissions = [
    "Get",
    "List",
    "Set",
    "Delete"
  ]
}

data "azuread_service_principal" "spn" {
  display_name = "${var.name_bu}${var.ad_domain}spn${var.name_environment}euw"
}

data "azuread_group" "dev_domain" {
  display_name = "AzUsers-${lookup(local.AAD_Env_Name_conversion, var.name_environment)}eCommerce-Dev-${var.ad_domain}"
}

resource "azurerm_key_vault_access_policy" "spn" {
  key_vault_id = azurerm_key_vault.vault.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azuread_service_principal.spn.object_id

  secret_permissions = [
    "set",
    "get",
    "list",
    "delete",
    "recover",
    "purge"
  ]
}

resource "azurerm_key_vault_access_policy" "dev" {
  key_vault_id = azurerm_key_vault.vault.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azuread_group.dev_domain.id
  secret_permissions = [
    "set",
    "get",
    "list",
    "Delete",
    "purge",
    "recover",
    "restore"
  ]
}

data "azuread_group" "coreteam_domain" {
  display_name = "AzUsers-${lookup(local.AAD_Env_Name_conversion, var.name_environment)}eCommerce-Dev-${var.ad_domain}"
}

resource "azurerm_key_vault_access_policy" "coreteam" {
  key_vault_id = azurerm_key_vault.vault.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azuread_group.coreteam_domain.id
  secret_permissions = [
    "set",
    "get",
    "list",
    "Delete",
    "purge",
    "recover",
    "restore"
  ]
}

resource "azurerm_key_vault_secret" "storageaccountkey" {
  name         = "CDN-StorageAccount-Key"
  value        = azurerm_storage_account.cdn_ui_content_storage.primary_access_key
  key_vault_id = azurerm_key_vault.vault.id
  depends_on   = [azurerm_key_vault_access_policy.spn, azurerm_key_vault.vault]
}

resource "azurerm_key_vault_secret" "storageaccountname" {
  name         = "CDN-StorageAccount-Name"
  value        = azurerm_storage_account.cdn_ui_content_storage.name
  key_vault_id = azurerm_key_vault.vault.id
  depends_on   = [azurerm_key_vault_access_policy.spn, azurerm_key_vault.vault]
}
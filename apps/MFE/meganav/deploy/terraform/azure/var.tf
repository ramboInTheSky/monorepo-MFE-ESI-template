############################################
# NAMING
############################################

variable "name_bu" {
  default = "ecm"
}

variable "name_domain" {
  default = "meganav"
}

variable "name_environment" {
  default = "ts"
}

variable "ad_domain" {
  default = "browse01"
}

##################################################
# LOCATION
##################################################

variable "location" {
  default = "westeurope"
}

# Each region must have corresponding a shortend name for resource naming purposes 
variable "location_name_map" {
  type = map(string)

  default = {
    northeurope   = "eun"
    westeurope    = "euw"
    uksouth       = "uks"
    ukwest        = "ukw"
    eastus        = "use"
    eastus2       = "use2"
    westus        = "usw"
    eastasia      = "ase"
    southeastasia = "asse"
  }
}

##################################################
# RESOURCE GROUP INFORMATION
##################################################

variable "build_info" {
  type    = string
  default = "unknown_0.0.0"
}

variable "build_repouri" {
  type    = string
  default = "https://0.0.0.0"
}


variable "tags" {
  type = map(string)

  default = {
    Project       = "Platform Modernisation"
    Department    = "Ecommerce"
    "Cost Centre" = "D9620"
    Domain        = "meganav"
    "Managed By"  = "meganav"
    Application   = "MainSite"
    Service       = "Ecommerce.meganav.Assets"
  }
}

variable "content_container" {
  type    = string
  default = "static-content"
}

variable "health_file" {
  type    = string
  default = "healthz.html"
}

variable "health_container" {
  type    = string
  default = "health"
}

variable "meganav_content_path" {
  type    = string
  default = "meganav"
}


############################################
# Data Resources
############################################

data "azurerm_client_config" "current" {}

############################################
# LOCALS
############################################

locals {
  location_short                 = lookup(var.location_name_map, var.location)
  resource_group_name            = "${var.name_bu}${var.name_domain}cdnrgp${var.name_environment}${local.location_short}"
  cdn_storage_name               = "${var.name_bu}${var.name_domain}cdnsto${var.name_environment}${local.location_short}"
  key_vault_name                 = "${var.name_bu}${var.name_domain}key${var.name_environment}${local.location_short}"
  AAD_Env_Name_conversion = {
    ts      = "Sandbox."
    sx      = "Sandbox."
    ci      = "CI."
    pp      = "PreProd."
    pd      = "Prod."
  }
  resource_tags = merge(var.tags, {
    Environment      = var.name_environment
    "Build Info"     = var.build_info
    "Build Repo Uri" = var.build_repouri
  })
}
output "cdn_storage_rg_name" {
  value = azurerm_resource_group.footer.name
}

output "cdn_storage_account_name" {
  value = azurerm_storage_account.cdn_footer_content_storage.name
}

output "keyvault_id" {
  value = azurerm_key_vault.vault.id
}

output "keyvault_uri" {
  value = azurerm_key_vault.vault.vault_uri
}
terraform {
  required_version = "~> 0.14"
  backend "azurerm" {}
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.52"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 1.4"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "azuread" {
}
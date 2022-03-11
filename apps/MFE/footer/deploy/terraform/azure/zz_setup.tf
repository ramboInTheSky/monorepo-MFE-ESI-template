terraform {
  required_version = "~> 1.0.0"
  backend "azurerm" {}
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.63"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 1.5"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "azuread" {
}
import React, {useState} from "react"
import env from "../../config/env"
import {
  ChevronContainer,
  Chevron
} from "./components"

const SearchBannerChevron = () => {
  const [open, setOpen] = useState(false)

  const toggleSearchBannerText = () => {
      const searchBannerText = document.getElementById("search-banner-mobile-read-more-content")

      setOpen(!open)
      
      if(searchBannerText){
        if(!open){
          searchBannerText.classList.add("show")
        } else {
          searchBannerText.classList.remove("show")
        }
      }
  }

  return (
    <ChevronContainer>
        <Chevron
            src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/chevron.svg`}
            data-testid="plp-search-banner-chevron"
            onClick={toggleSearchBannerText}
            isOpen={open}
        />
    </ChevronContainer>
  )
}

export default SearchBannerChevron
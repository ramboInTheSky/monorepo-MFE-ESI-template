import { TextModel } from "models/Text"
import React from "react"
import {FiltersPanelContainer, PaddedWrapper, Text} from "../components"


interface NoOptionsProps {
    text: TextModel
  }

const NoOptionsText = ({text}: NoOptionsProps) => (
    <FiltersPanelContainer data-testid="plp-tabbed-facets-panel">
        <PaddedWrapper>
            <Text data-testid="plp-tabbed-facets-no-options">{text.labels.noOptionsAvailable}</Text>
        </PaddedWrapper>
    </FiltersPanelContainer>
)

export default NoOptionsText
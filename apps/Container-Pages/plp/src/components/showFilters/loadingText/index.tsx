import { TextModel } from "models/Text"
import React from "react"

import { PaddedWrapper, Text } from "../components"

interface LoadingTextProps {
  text: TextModel
}

const LoadingText = ({text}: LoadingTextProps) => (
  <PaddedWrapper>
      <Text>{text.labels.loadingResults}</Text>
  </PaddedWrapper>
)

export default LoadingText
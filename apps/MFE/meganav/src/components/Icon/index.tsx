import React from "react"
import {Container} from "./component"

export type IconProps = {
    imageUrl: string
    altText: string
    rotationDegrees?: number
    width?: number
}

const Icon = ({imageUrl, altText, rotationDegrees = 0, width = 0.4375}: IconProps) => (
    <Container rotationDegrees={rotationDegrees} src={imageUrl} alt={altText} width={width} />
)

export default Icon

import React from "react"
import {Img} from "./component"

export type IconProps = {
    src: string
    alt: string
}

const Icon = ({src, alt}: IconProps) => <Img src={src} alt={alt} />

export default Icon

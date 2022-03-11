import React from "react"
import {Container} from "./component"
import connect from "./connect"
import {configRelativePathURL} from "../../utils/configUrlPath"

type BannerComponentProps = {
    imageUrl: string
    target: string | null
    text: any
    siteUrl: string
}

export const Banner = ({imageUrl, target, text, siteUrl}: BannerComponentProps) => {
    const validTarget = configRelativePathURL(target ?? "", siteUrl)
    return (
    <Container data-testid="banner">
        <a href={validTarget}>
            <img alt={text.bannerAltText} src={imageUrl} />
        </a>
    </Container>
)}

export default connect(Banner)

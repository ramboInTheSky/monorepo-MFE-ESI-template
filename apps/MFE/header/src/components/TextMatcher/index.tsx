/* eslint-disable react/no-array-index-key */
import React from "react"
import {escapeRegex} from "../../utils/getRegExValue"
import {Span} from "./component"

export type TextMatcherProps = {text: string; textToMatch: string}

const TextMatcher = ({text, textToMatch}: TextMatcherProps) => {
    const regExp = new RegExp(escapeRegex(textToMatch), "gi")
    const replaced = text
        .replace(regExp, `,${textToMatch},`)
        .split(",")
        .filter(match => match !== "")

    return (
        <>
            {replaced.map((matchedText, ind) => (
                <React.Fragment key={matchedText + ind}>
                    {matchedText.toLowerCase() === textToMatch.toLowerCase() ? (
                        <Span>{matchedText}</Span>
                    ) : (
                        <span>{matchedText}</span>
                    )}
                </React.Fragment>
            ))}
        </>
    )
}
export default TextMatcher

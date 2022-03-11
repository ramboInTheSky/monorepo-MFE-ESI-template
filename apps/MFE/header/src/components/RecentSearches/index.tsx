import React from "react"
import connect from "./connect"
import {Li, Ul} from "./components"
import TextMatcher from "../TextMatcher"
import {SEARCH_DATA_GA, SEARCH_DATA_GA_RECENT_SEARCH} from "../../config/constants"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"
import {capitaliseEachWord} from "../../utils/capitaliseEachWord"

type Item = {item: string; url: string}

export type RecentSearchesProps = {
    items: Item[]
    typedCharacters: string
}

export const RecentSearches = ({items, typedCharacters}: RecentSearchesProps) => {
    return (
        <Ul>
            {items.map(({item, url}) => (
                <Li key={item} onClick={removeFromLocalStorage}>
                    <a
                        href={url}
                        data-testid={`header-recent-searches-${item}`}
                        data-ga-v1={SEARCH_DATA_GA}
                        data-ga-v2={item}
                        data-ga-v3={SEARCH_DATA_GA_RECENT_SEARCH}
                    >
                        <TextMatcher text={capitaliseEachWord(item)} textToMatch={typedCharacters} />
                    </a>
                </Li>
            ))}
        </Ul>
    )
}

export default connect(RecentSearches)

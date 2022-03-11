import React from "react"
import { TextModel } from "models/Text"
import Menu from "../menu"
import connect from "./connect"
import {Sorting} from "../../models/Sorting"


interface SortProps {
    sortOptions?: Sorting
    onSelect: (value: string) => void
    text: TextModel
}

export const MobileSort = ({sortOptions, onSelect, text}: SortProps) => {
    return <Menu options={sortOptions} buttonText={text.labels.sortMenu} onSelect={onSelect} text={text} />
}
export default connect(MobileSort)

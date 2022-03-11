import {SuitSummaryApiContract, SuitSummaryData} from "./suit"
import {SofaSummaryApiContract} from "./sofa"

export const isApiSuitSummaryData = (response: any): response is SuitSummaryApiContract =>
    (response as SuitSummaryApiContract).type?.toLowerCase() === "suit"

export const isSuitSummaryData = (response: any): response is SuitSummaryData =>
    (response as SuitSummaryData).type?.toLowerCase() === "suit"

export const isApiSofaSummaryData = (response: any): response is SofaSummaryApiContract =>
    (response as SofaSummaryApiContract).type?.toLowerCase() === "sofa"

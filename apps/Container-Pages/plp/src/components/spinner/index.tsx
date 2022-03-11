import React from "react"
import connect from "./connect"
import env from "../../config/env"
import {LoadingIconContainer, LoadingIconPrevNextPageContainer} from "./components"

const {REACT_APP_BLOB_STORAGE_PATH} = env

interface SpinnerProps {
    realm: string
    ariaValueText: string
    testid: string
}

export const Spinner = ({realm, ariaValueText, testid}: SpinnerProps) => (
    <LoadingIconContainer role="progressbar" aria-valuetext={ariaValueText} data-testid={testid}>
        <img src={`${REACT_APP_BLOB_STORAGE_PATH}/icons/shared/brand/${realm}/loader.gif`} alt="Loading" />
    </LoadingIconContainer>
)

export const PrevNextSpinner = ({realm, ariaValueText, testid}: SpinnerProps) => (
    <LoadingIconPrevNextPageContainer role="progressbar" aria-valuetext={ariaValueText} data-testid={testid}>
        <img src={`${REACT_APP_BLOB_STORAGE_PATH}/icons/shared/brand/${realm}/loader.gif`} alt="Loading" />
    </LoadingIconPrevNextPageContainer>
)
const ConnectSpinner = connect(Spinner)
const ConnectPrevNextSpinner = connect(PrevNextSpinner)

export {ConnectSpinner, ConnectPrevNextSpinner}

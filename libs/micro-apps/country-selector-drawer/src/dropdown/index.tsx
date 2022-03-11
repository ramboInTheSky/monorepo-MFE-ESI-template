import React, {useRef} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {ListItemIcon, useMediaQuery} from "@mui/material"
import {COUNTRY_SELECTOR_DRAWER_BREAKPOINT, COUNTRY_SELECT_DROPDOWN_DATA_GA} from "../config/constants"
import {
    StyledIcon,
    StyledSelect,
    ElementProps,
    SelectedMenuItem,
    StyledOutlinedInput,
    SelectedFormControl,
    MenuItemCountryFlagImg,
} from "./component"
import {Country} from "../models/countryselector"
import connect from "./connect"
import {getCountryFlagPath} from "../utils/countryUtils"

type CountrySelectDropdownType = {
    chevronIcon: string
    territory: string
    cdnBaseUrl: string
    textAlignment: string
    countriesList: Country[] | null
    selectedCountry: Country | null
    selectCountry: (countryCode: string) => void
}

let timerId

export const CountrySelectDropdown = ({
    chevronIcon,
    territory,
    textAlignment,
    countriesList,
    cdnBaseUrl,
    selectedCountry,
    selectCountry,
}: CountrySelectDropdownType) => {
    const countryRef = useRef<HTMLInputElement>()
    const anchorDirectionBreakpoint = useMediaQuery(`(min-width:${COUNTRY_SELECTOR_DRAWER_BREAKPOINT})`)
    const itemAligment = textAlignment === "ltr" ? "left" : "right"
    const elementProps = ElementProps()

    const handleChange = event => {
        selectCountry(event.target.value as string)
    }

    const onOpen = () => {
        timerId = setTimeout(() => {
            if (countryRef.current) {
                countryRef.current.focus()
            }
            clearTimeout(timerId)
        }, 500)
    }

    const setCountryRef = c => ref => {
        if (selectedCountry?.countryCode === c.countryCode) {
            countryRef.current = ref
        }
    }

    return (
        <SelectedFormControl variant="outlined">
            <StyledSelect
                value={selectedCountry ? selectedCountry.countryCode : territory}
                onChange={handleChange}
                onOpen={onOpen}
                MenuProps={{
                    keepMounted: false,
                    disablePortal: true,
                    classes: {paper: elementProps.menuPaper},
                    anchorOrigin: {
                        vertical: anchorDirectionBreakpoint ? "bottom" : "top",
                        horizontal: itemAligment,
                    },
                    transformOrigin: {
                        vertical: anchorDirectionBreakpoint ? "top" : "bottom",
                        horizontal: itemAligment,
                    },
                }}
                input={
                    <StyledOutlinedInput
                        data-testid="country-selector-select-input"
                        name="country-selector-select"
                        id="country-selector-select"
                    />
                }
                IconComponent={props => (
                    <StyledIcon {...props} className={`material-icons ${props.className}`} src={chevronIcon} />
                )}
                data-testid="country-selector-select-menu"
            >
                {/* eslint-disable-next-line react/display-name */}
                {countriesList?.map((c: Country) => (
                    <SelectedMenuItem
                        data-testid={`country-selector-${c.name}`}
                        data-ga-v1={COUNTRY_SELECT_DROPDOWN_DATA_GA}
                        data-ga-v2={c.name}
                        key={c.name}
                        value={c.countryCode}
                        className={elementProps.root}
                        ref={setCountryRef(c)}
                    >
                        <ListItemIcon className={elementProps.icon}>
                            <MenuItemCountryFlagImg
                                alt={c.countryCode}
                                src={getCountryFlagPath(cdnBaseUrl, c.countryCode)}
                                data-testid={formatTextTestIds("header-country-lang-flag")}
                            />
                        </ListItemIcon>
                        {c.nameWithCurrency}
                    </SelectedMenuItem>
                ))}
            </StyledSelect>
        </SelectedFormControl>
    )
}

export default connect(CountrySelectDropdown)

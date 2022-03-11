import React, {useRef} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {ListItemIcon, useMediaQuery} from "@mui/material"
import {
    COUNTRY_SELECTOR_DRAWER_BREAKPOINT,
    CHEVRON_ICON_URL,
    COUNTRY_SELECT_DROPDOWN_DATA_GA,
} from "../../config/constants"
import {
    StyledIcon,
    StyledSelect,
    ElementProps,
    SelectedMenuItem,
    StyledOutlinedInput,
    SelectedFormControl,
    MenuItemCountryFlagImg,
} from "./component"
import connect from "./connect"
import {Country as CountryType} from "../../models/countryselector"
import env from "../../config/env"
import {useSearchCountrySelectorByKeyPress} from "../../utils/useSearchCountrySelectorByKeyPress"

const CHEVRON_ICON = `${env.REACT_APP_BLOB_STORAGE_PATH}${CHEVRON_ICON_URL}`

type CountrySelectDropdownType = {
    territory: string
    textAlignment: string
    countriesList: CountryType[] | null
    selectedCountry: CountryType | null
    selectCountry: (countryCode: string) => void
}

let timerId: any = 0

export const CountrySelectDropdown = ({
    territory,
    textAlignment,
    countriesList,
    selectedCountry,
    selectCountry,
}: CountrySelectDropdownType) => {
    const countryRef = useRef<HTMLInputElement>()
    const anchorDirectionBreakpoint = useMediaQuery(`(min-width:${COUNTRY_SELECTOR_DRAWER_BREAKPOINT})`)
    const itemAligment = textAlignment === "ltr" ? "left" : "right"
    const elementProps = ElementProps()

    const {onKeyPress} = useSearchCountrySelectorByKeyPress(countriesList, selectCountry)

    const handleChange = (event: any): void => {
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
        if (selectedCountry?.CountryCode === c.CountryCode) {
            countryRef.current = ref
        }
    }

    return (
        <SelectedFormControl variant="outlined">
            <StyledSelect
                value={selectedCountry ? selectedCountry.CountryCode : territory}
                onChange={handleChange}
                onOpen={onOpen}
                onKeyPress={e => onKeyPress(e.key)}
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
                    <StyledIcon {...props} className={`material-icons ${props.className}`} src={CHEVRON_ICON} />
                )}
                data-testid="country-selector-select-menu"
            >
                {/* eslint-disable-next-line react/display-name */}
                {countriesList?.map((c: CountryType) => (
                    <SelectedMenuItem
                        data-testid={`country-selector-${c.Name}`}
                        data-ga-v1={COUNTRY_SELECT_DROPDOWN_DATA_GA}
                        data-ga-v2={c.DisplayText}
                        key={c.Country}
                        value={c.CountryCode}
                        className={elementProps.root}
                        ref={setCountryRef(c)}
                    >
                        <ListItemIcon className={elementProps.icon}>
                            <MenuItemCountryFlagImg
                                alt={c.CountryCode}
                                src={c.iconUrl}
                                data-testid={formatTextTestIds("header-country-lang-flag")}
                            />
                        </ListItemIcon>
                        {c.DisplayText}
                    </SelectedMenuItem>
                ))}
            </StyledSelect>
        </SelectedFormControl>
    )
}

export default connect(CountrySelectDropdown)

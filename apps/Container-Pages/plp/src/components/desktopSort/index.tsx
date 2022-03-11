/* eslint-disable react/display-name */
import React, {useCallback} from "react"
import {ClickAwayListener, Fade} from "@mui/material"

import {TextModel} from "models/Text"
import {
    DesktopSortContainer,
    StyledFormControl,
    StyledInputLabel,
    StyledOutlinedInput,
    StyledAutocomplete,
    StyledPopper,
} from "./components"
import env from "../../config/env"
import connect from "./connect"
import {Sorting, SortingOption} from "../../models/Sorting"
import TextAlignment from "../../models/textAlignment"
import {useSelectDropdown} from "../../hooks/useSelectDropdown"
import TrackSortOpen from "../../events/trackEvent/events/trackSortOpen"
import TrackSortOption from "../../events/trackEvent/events/trackSortOption"

interface DesktopSortProps {
    sortOptions?: Sorting
    onSelect: (value: string) => void
    textAlignment: TextAlignment
    text: TextModel
}

const CustomPopper = closeDropdown => props => {
    const {children, id, ...other} = props
    return (
        <ClickAwayListener onClickAway={closeDropdown}>
            <StyledPopper {...other} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={250}>
                        {children}
                    </Fade>
                )}
            </StyledPopper>
        </ClickAwayListener>
    )
}

export const DesktopSort = ({sortOptions, onSelect, text}: DesktopSortProps) => {
    const {showDropdown, openDropdown, closeDropdown} = useSelectDropdown()

    const handleChange = useCallback(
        (_event: React.ChangeEvent<{}>, value, _reason: string) => {
            const option = (value as SortingOption).value
            closeDropdown()
            onSelect(option)
            TrackSortOption(option)
        },
        [onSelect, closeDropdown],
    )

    const toggleOpen = () => {
        if (showDropdown) {
            closeDropdown()
        } else {
            openDropdown()
            TrackSortOpen()
        }
    }

    return (
        <DesktopSortContainer>
            <StyledFormControl>
                <StyledInputLabel htmlFor="desktop-sort-select-input" shrink={false} disableAnimation>
                    {text.labels.sortMenu}
                </StyledInputLabel>

                {/* Styled Components and Autocomplete have TypeScript isssues, causing need for casting as "SortingOption"
                    https://github.com/mui-org/material-ui/issues/21727 */}
                <StyledAutocomplete
                    open={showDropdown}
                    selectOnFocus={false}
                    id="desktop-sort-select-input"
                    disableClearable
                    forcePopupIcon
                    disablePortal
                    onBlur={() => closeDropdown()}
                    autoHighlight
                    value={sortOptions?.options.find(o => o.value === sortOptions.selected)}
                    isOptionEqualToValue={(option, value) =>
                        (option as SortingOption).value === (value as SortingOption).value
                    }
                    inputValue={sortOptions?.options.find(o => o.value === sortOptions.selected)?.name}
                    data-testid="plp-desktop-sort-button"
                    onChange={handleChange}
                    renderInput={params => (
                        <StyledOutlinedInput
                            {...params}
                            data-testid="plp-desktop-sort-select-input"
                            name="desktop-sort-select-input"
                            variant="outlined"
                            type="button"
                            onClick={toggleOpen}
                        />
                    )}
                    options={sortOptions!.options}
                    getOptionLabel={option => (option as SortingOption).name}
                    popupIcon={
                        <img
                            className="material-icons "
                            src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/chevron.svg`}
                            alt={text.assetsAlt.chevron}
                        />
                    }
                    PopperComponent={CustomPopper(closeDropdown)}
                />
            </StyledFormControl>
        </DesktopSortContainer>
    )
}
export default connect(DesktopSort)

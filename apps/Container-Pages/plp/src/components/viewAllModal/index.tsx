import React, {useContext} from "react"
import {ThemeContext} from "styled-components"
import {formatTextTestIds} from "@monorepo/utils"
import {breakpoints} from "@monorepo/themes"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"
import {useMediaQuery} from "@mui/material"
import {TextModel} from "models/Text"
import connect from "./connect"
import FilterButton from "../filterButton"
import CharacterFilter from "../characterFilter"
import SelectedFacets from "../selectedFacets"
import FacetsGrid from "../facetsGrid"
import FacetSearch from "../facetSearch"
import {
    ModalAppBar,
    ModalToolbar,
    StyledModal,
    ModalBody,
    ModalConfirmButton,
    ModalTitle,
    FiltersBody,
    FiltersReview,
} from "./components"

interface ViewAllModalProps {
    isViewMoreOpen: boolean
    title: string
    hideSearchBox: boolean
    hideLetterNav: boolean
    onClose: () => void
    onCloseResize: () => void
    onCloseApplyFilter: () => void
    text: TextModel
}

export const ViewAllModal = ({
    isViewMoreOpen,
    onClose,
    onCloseResize,
    title,
    onCloseApplyFilter,
    hideSearchBox,
    hideLetterNav,
    text,
}: ViewAllModalProps) => {
    const theme = useContext(ThemeContext)

    const isMedium = useMediaQuery(
        `(min-width: ${breakpoints.values[theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px)`,
    )

    React.useEffect(() => {
        if (!isMedium) {
            onCloseResize()
        }
    }, [onCloseResize, isMedium])

    return (
        <StyledModal
            disableScrollLock
            aria-labelledby="plp-modal-title"
            aria-describedby="plp-modal-description"
            data-testid={formatTextTestIds("plp-view-all-modal")}
            open={isViewMoreOpen}
            className="platform_modernisation_plp"
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isViewMoreOpen}>
                <ModalBody>
                    <ModalAppBar>
                        <ModalToolbar variant="dense" disableGutters>
                            <ModalTitle variant="h4">{title}</ModalTitle>
                            {!hideSearchBox && <FacetSearch />}
                            <FilterButton
                                onClick={onClose}
                                text={text.buttons.close}
                                data-testid="plp-view-all-close"
                            />
                        </ModalToolbar>
                    </ModalAppBar>
                    {!hideLetterNav && <CharacterFilter />}
                    <FiltersBody>
                        <FacetsGrid />
                        <FiltersReview>
                            <SelectedFacets />
                            <ModalConfirmButton>
                                <FilterButton
                                    onClick={onCloseApplyFilter}
                                    text={`${text.buttons.confirm} ${title}`}
                                    large
                                />
                            </ModalConfirmButton>
                        </FiltersReview>
                    </FiltersBody>
                </ModalBody>
            </Fade>
        </StyledModal>
    )
}

export default connect(ViewAllModal)

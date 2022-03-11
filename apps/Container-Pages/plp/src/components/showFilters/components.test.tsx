import {render} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"

import {
    CenteredFlexContainer,
    CloseButton,
    CloseIcon,
    CloseIconButton,
    DrawerContainer,
    DrawerContent,
    FeatFacetsContainer,
    FiltersBodyContainer,
    FiltersContainerFooter,
    FiltersContainerHeader,
    ShowFiltersContainer,
    StyledFacetButton,
    Text,
    TextWrapper,
    Title,
    ViewResultsButton,
    FiltersContainer,
    Tick,
    TickLine1,
    TickLine2,
    LoadingSpinner,
    FiltersPanelContainer,
    PaddedWrapper,
    EmptyFlexContainer,
    SelectedFacetIndicator,
    TabbedFacetsContainer,
    SpinnerWrapper,
} from "./components"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("ShowFilter components", () => {
    describe("Given a CloseButton", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <CloseButton>Test</CloseButton>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a FiltersContainerHeader", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersContainerHeader>Test</FiltersContainerHeader>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a FiltersContainerFooter", () => {
        it("should render the component correctly to match the snapshot when 'isFullWidthMode' is true", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersContainerFooter isFullWidthMode>Test</FiltersContainerFooter>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should render the component correctly to match the snapshot when 'isFullWidthMode' is false", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersContainerFooter isFullWidthMode={false}>Test</FiltersContainerFooter>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a FeatFacetsContainer", () => {
        it("should render the component correctly to match the snapshot when there is no right border", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FeatFacetsContainer showRightBorder={false}>Test</FeatFacetsContainer>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should render the component correctly to match the snapshot when there is right border", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FeatFacetsContainer showRightBorder>Test</FeatFacetsContainer>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a Text", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Text>Test</Text>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a Title", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Title>Test</Title>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a TextWrapper", () => {
        it("should render the component correctly to match the snapshot when 'noBorder' is true", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TextWrapper noBorder>Test</TextWrapper>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should render the component correctly to match the snapshot when 'noBorder' is false", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TextWrapper noBorder={false}>Test</TextWrapper>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
        it("should render the component correctly to match the snapshot when 'fullWidth' is true", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TextWrapper fullWidth>Test</TextWrapper>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
        it("should render the component correctly to match the snapshot when 'isKeyFilter' is true", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TextWrapper isKeyFilter>Test</TextWrapper>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a CloseIconButton", () => {
        it("should match the snapshot correctly when 'isFullWidthMode' is true", () => {
            const {asFragment} = render(<CloseIconButton isFullWidthMode>Test</CloseIconButton>)

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot correctly when 'isFullWidthMode' is false", () => {
            const {asFragment} = render(<CloseIconButton isFullWidthMode={false}>Test</CloseIconButton>)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a CloseIcon", () => {
        it("should match the snapshot correctly when 'isFullWidthMode' is true", () => {
            const {asFragment} = render(<CloseIcon isFullWidthMode src="image.jpeg" />)

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot correctly when 'isFullWidthMode' is false", () => {
            const {asFragment} = render(<CloseIcon isFullWidthMode={false} src="image.jpeg" />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a ViewResultsButton", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <ViewResultsButton>Test</ViewResultsButton>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a DrawerContainer", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <DrawerContainer>
                    <p>Test</p>
                </DrawerContainer>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a DrawerContent", () => {
        it("should match the snapshot correctly when 'isFullWidthMode' is true", () => {
            const {asFragment} = render(<DrawerContent isFullWidthMode>Test</DrawerContent>)

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot correctly when 'isFullWidthMode' is false", () => {
            const {asFragment} = render(<DrawerContent isFullWidthMode={false}>Test</DrawerContent>)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a CenteredFlexContainer", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <CenteredFlexContainer>
                    <p>Test</p>
                </CenteredFlexContainer>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a ShowFiltersContainer", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <ShowFiltersContainer>
                    <p>Test</p>
                </ShowFiltersContainer>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a FiltersBodyContainer", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <FiltersBodyContainer>
                    <p>Test</p>
                </FiltersBodyContainer>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a StyledFacetButton", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <StyledFacetButton>
                    <p>Test</p>
                </StyledFacetButton>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        describe("when 'isFocused' is set to 'true'", () => {
            it("should match the snapshot correctly", () => {
                const {asFragment} = render(
                    <ThemeProvider theme={mockTheme}>
                        <StyledFacetButton isFocused>
                            <p>Test</p>
                        </StyledFacetButton>
                    </ThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
            })

            describe("and when top border is hidden", () => {
                it("should match the snapshot correctly", () => {
                    const {asFragment} = render(
                        <ThemeProvider theme={mockTheme}>
                            <StyledFacetButton isFocused hideTopBorder>
                                <p>Test</p>
                            </StyledFacetButton>
                        </ThemeProvider>,
                    )

                    expect(asFragment()).toMatchSnapshot()
                })
            })

            describe("and when left border is shown", () => {
                it("should match the snapshot correctly", () => {
                    const {asFragment} = render(
                        <ThemeProvider theme={mockTheme}>
                            <StyledFacetButton isFocused showLeftBorder>
                                <p>Test</p>
                            </StyledFacetButton>
                        </ThemeProvider>,
                    )
                    expect(asFragment()).toMatchSnapshot()
                })
            })

            describe("when 'isFocused' is set to 'false'", () => {
                it("should match the snapshot correctly", () => {
                    const {asFragment} = render(
                        <ThemeProvider theme={mockTheme}>
                            <StyledFacetButton isFocused={false}>
                                <p>Test</p>
                            </StyledFacetButton>
                        </ThemeProvider>,
                    )

                    expect(asFragment()).toMatchSnapshot()
                })
            })
        })
    })

    describe("Given a FiltersContainer", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <FiltersContainer>
                    <p>Test</p>
                </FiltersContainer>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a LoadingSpinner", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<LoadingSpinner />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a Tick", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <Tick theme={{direction: "ltr"} as any}>
                    <TickLine1 animate={false} />
                    <TickLine2 animate={false} />
                </Tick>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("When RTL it should match the snapshot correctly", () => {
            const {asFragment} = render(
                <Tick theme={{direction: "rtl"} as any}>
                    <TickLine1 animate />
                    <TickLine2 animate />
                </Tick>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a FiltersPanelContainer", () => {
        it("should render correctly to match the snapshot", () => {
            const {asFragment} = render(<FiltersPanelContainer>Test</FiltersPanelContainer>)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a PaddedWrapper", () => {
        it("should render correctly to match the snapshot", () => {
            const {asFragment} = render(<PaddedWrapper>Test</PaddedWrapper>)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a EmptyFlexContainer", () => {
        it("should render correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <EmptyFlexContainer>Test</EmptyFlexContainer>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a SelectedFacetIndicator", () => {
        it("should render correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SelectedFacetIndicator>Test</SelectedFacetIndicator>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a TabbedFacetsContainer", () => {
        it("should render correctly to match the snapshot", () => {
            const {asFragment} = render(<TabbedFacetsContainer hasSelectedFacet={false}>Test</TabbedFacetsContainer>)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a SpinnerWrapper", () => {
        it("should render correctly to match the snapshot", () => {
            const {asFragment} = render(<SpinnerWrapper>Test</SpinnerWrapper>)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})

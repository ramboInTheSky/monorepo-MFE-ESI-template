import styled from "styled-components"

export const Tooltip = styled.div`
    z-index: 4;
`

export const TooltipArrowShadow = styled.span`
    box-shadow: 0rem 0.1875rem 0.25rem 0rem #888888;
    width: 1.1875rem;
    height: 1.1875rem;
    margin: -1.5625rem 0.875rem 0.6875rem 15.0625rem;
    transform: ${props => (props.theme.direction === "ltr" ? "rotate(45deg)" : "rotate(-45deg)")};
    border-left: solid 0.0625rem gray;
    border-bottom: solid 0.0625rem gray;
    background-color: white;
    position: absolute;
    z-index: 2;
`

export const TooltipArrowNoShadow = styled.span`
    width: 1.1875rem;
    height: 1.1875rem;
    margin: -1.5625rem 0.875rem 0.6875rem 15.0625rem;
    transform: ${props => (props.theme.direction === "ltr" ? "rotate(45deg)" : "rotate(-45deg)")};
    border-left: solid 0.0625rem gray;
    border-bottom: solid 0.0625rem gray;
    background-color: white;
    position: absolute;
    z-index: 3;
`

export const TooltipWrapper = styled.div`
    box-shadow: 0rem 0.1875rem 0.25rem 0.0625rem #888888;
    position: absolute;
    left: 15.625rem;
    width: 16.9375rem;
    padding: 0 0.25rem 1rem 0.875rem;
    border: solid 0.0625rem gray;
    border-radius: 0.25rem;
    background-color: white;
    z-index: 2;
    margin-top: -3.3rem;
    min-height: 5.3125rem;
`

export const TooltipTitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`

export const TooltipTitle = styled.div`
    height: 1.3125rem;
    margin: 1rem 0rem 0.75rem 0.125rem;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 0.0075rem;
`

export const TooltipBody = styled.div`
	width: 14.875rem;
	margin: 0.0625rem 0.8125rem 0 0.125rem;
	font-size: 0.875rem;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: 0.0075rem;
`

export const TooltipTerms = styled.a`
	color: #257F39;
`

export const CloseIconButton = styled.button`
    cursor: pointer;
    border: none;
    background: transparent;
    -webkit-tap-highlight-color: transparent;
    padding-right: 0.9375rem;
`

export const CloseIcon = styled.img`
    height: 13.4px;
    width: 13.4px;
`

export const FacetTooltip = styled.img`
    opacity: 1;
    position: absolute;
    right: 1.3125rem;
    padding-top: 0rem;
    width: 2.25rem;
    height: 2.25rem;
    z-index: 0;
`

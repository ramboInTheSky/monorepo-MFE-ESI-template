import {connect} from "react-redux"
import State from "../../models/State"

export const mapStateToProps = (state: State, ownProps) => {
  const {features} = state
  return {
    enabledTooltips: features.enableTooltips,
    ...ownProps
  }
}

export const mergeProps = (state: any, ownProps) => ({
  ...state,
  ...ownProps
})

export default connect(mapStateToProps, null as any, mergeProps)

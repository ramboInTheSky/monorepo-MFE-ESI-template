import React from "react"
import {SubRegionElementModel} from "../../../models/footerModel"
import connect from "./connect"
import QuickLink from "../QuickLink"

export const MyAccountQuickLink = (props: SubRegionElementModel) => <QuickLink data={props} />

export default connect(MyAccountQuickLink)

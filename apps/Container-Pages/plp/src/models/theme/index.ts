import {ThemeColor} from "@monorepo/themes"
import {Dimensions} from "../Dimensions"

export type Theme = {
    dimensions: Dimensions
    colours: ThemeColor
    direction: string
}
export default Theme

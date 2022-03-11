import {ThemeColor} from "@monorepo/themes"
import {RealmStyles} from "../regions/index"

export class Theme {
    styles: RealmStyles = {} as any
    colours: ThemeColor = new ThemeColor()
    direction = "ltr"
}

export type ThemeType = "Primary" | "Secondary" | "Tertiary"

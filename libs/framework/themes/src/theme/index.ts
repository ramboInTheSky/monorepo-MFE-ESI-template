import { ThemeColor } from "../themecolors"

export type Direction = "ltr" | "rtl"

export interface Theme {
    styles: any 
    colours: ThemeColor
    direction: Direction
}
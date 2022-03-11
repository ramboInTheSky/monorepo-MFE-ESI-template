import {Column} from "../../models/secondary-nav"
import {ExcludeFrom, ExcludeFromValues} from "../../models/excludeFrom"

export const excludeFromAccordion = (exclude: ExcludeFromValues) => exclude === "NarrowView"
export const excludeFromDrawer = (exclude: ExcludeFromValues) => exclude === "WideView"

interface ExcludableItem {
    excludeFrom?: ExcludeFrom
}
export const filterByExcludeFrom = (showAsDrawer: boolean) => (item: ExcludableItem) =>
    !item.excludeFrom ||
    (showAsDrawer && !item.excludeFrom.some(excludeFromDrawer)) ||
    (!showAsDrawer && !item.excludeFrom.some(excludeFromAccordion))

export const filterColumnsByExcludeFrom = (showAsDrawer: boolean, columns: Column[]) =>
    columns
        ? columns.filter(filterByExcludeFrom(showAsDrawer)).map(column => ({
              ...column,
              items: column.items.filter(filterByExcludeFrom(showAsDrawer)).map(category => ({
                  ...category,
                  items: category.items.filter(filterByExcludeFrom(showAsDrawer)),
              })),
          }))
        : []

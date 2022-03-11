import {SearchCategory} from "../../../../models/SearchCategory"
import {publishPlpLandingPageBloomreachEvent} from "../../../publishPlpLandingPageBloomreachEvent"

export const handleBloomreachCategoryInfo = (searchCategory: SearchCategory) => {
    if (searchCategory.id !== "" || searchCategory.name !== "") {
        publishPlpLandingPageBloomreachEvent({
            id: searchCategory.id,
            name: encodeURIComponent(searchCategory.name),
        })
    }
}

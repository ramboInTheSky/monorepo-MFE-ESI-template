import { TextModel } from "models/Text"
import {HeaderLanguageType} from "../types"
import {joinArrayBasedOnLanguage} from "../../joinArrayBasedOnLanguage"

const genderGroups = {
    girls: ["youngergirls", "oldergirls", "newborngirls", "babygirls", "girls"],
    boys: ["youngerboys", "olderboys", "newbornboys", "babyboys", "boys"],
    women: ["women"],
    men: ["men"],
    unisex: ["newbornunisex", "babyunisex", "unisex"],
}

export const getGenderGroup = gender => {
    let findGenderGroup
    Object.keys(genderGroups).forEach(group => {
        const genderGroup = genderGroups[group]
        genderGroup.forEach(genderGroupItem => {
            if (genderGroupItem === gender) {
                findGenderGroup = group
            }
        })
    })

    return findGenderGroup
}

const updateGender = (genderArray: string[], headerLanguage: HeaderLanguageType, text: TextModel): string => {
    let singleGender
    let mixedGenders
    let previousGenderGroup
    genderArray.forEach(gender => {
        if (gender.includes("unisex")) {
            return
        }
        const genderGroup = getGenderGroup(gender)
        if (!singleGender) {
            singleGender = text.pages.seoMetaData.genderValues[genderGroup]
        }

        if (!mixedGenders && previousGenderGroup && previousGenderGroup !== genderGroup) {
            mixedGenders = joinArrayBasedOnLanguage(headerLanguage, genderArray.map(a => text.pages.seoMetaData.genderValues[a]))
        }

        previousGenderGroup = genderGroup
    })
    return mixedGenders || singleGender
}

export default updateGender

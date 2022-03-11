import {FeatureSwitchData} from "./searchBar"

export enum SupportedFeatureTypes {
    SearchBar = "SearchBar",
}

export class SupportedFeatures {
    public features = new SupportedFeatureSwitch()
}

export class SupportedFeatureSwitch {
    public SearchBar = new FeatureSwitchData()
}

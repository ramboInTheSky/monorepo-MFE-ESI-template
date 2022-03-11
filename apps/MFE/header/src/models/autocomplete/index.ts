export class SuggestionItem {
    q = ""
    dq = ""
}

export class ProductItem {
    sale_price = 0
    url = ""
    pid = ""
    thumb_image = ""
    title = ""
}
export class AutoCompleteParameters {
    accountId = ""
    domainKey = ""
    authKey = ""
}

export class AutoCompleteProducts {
    pid = ""
    sale_price = 0
    thumb_image = ""
    title = ""
    url = ""
}

export class AutoCompleteStateModel {
    q = ""
    suggestions: SuggestionItem[] | null = []
    numFound = 0
    products: AutoCompleteProducts[] | null = []
    parameters: AutoCompleteParameters = new AutoCompleteParameters()
    isLoading = false
}

export class AutoCompleteInitial {
    response = new AutoCompleteStateModel()
}

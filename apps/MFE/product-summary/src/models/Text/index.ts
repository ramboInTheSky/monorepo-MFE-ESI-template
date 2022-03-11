export interface TextModel {
    labels: {[key: string]: string}
    buttons: {[key: string]: string}
    price: {[key: string]: string}
    fitIconAltText: string
    product: {[key: string]: string}
    favouriteStates: {
        active: string,
        inactive: string,
        loading: string
    }
}

import {getAccountPage, getRegisterPage, getFavouritesPage} from "."

describe("Get url paths", () => {
    it("should get account page correctly", () => {
        expect(getAccountPage("https://www.amido.com")).toEqual(`https://www.amido.com/secure/accounts/transfer`)
    })

    it("should get favourites page correctly", () => {
        expect(getFavouritesPage("https://www.amido.com")).toEqual(`https://www.amido.com/favourites`)
    })

    it("should get register page correctly", () => {
        expect(getRegisterPage("https://www.amido.com")).toEqual(`https://www.amido.com/secure/accounts/register`)
    })
})

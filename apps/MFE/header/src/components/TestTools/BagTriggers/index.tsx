/* istanbul ignore file */
import React, {useState} from "react"
import {State} from "ducks"
import {connect} from "react-redux"
import axios from "../../../server/core/xhr"
import {Item, ShoppingBag} from "../../../models/shoppingbag"
import calculate from "../../../utils/calculate"

type Props = {itemCount: number; bag: ShoppingBag}

const btnStyle = {width: "50%"}
const style: React.CSSProperties = {
    border: "3px solid white",
    display: "flex",
    right: 0,
    margin: 0,
    padding: 0,
}
const promotionalStyle = {color: "black", backgroundColor: '#fff'}

const addMultiBuyDiscount = (bag: ShoppingBag, multiBuyDiscount: boolean): ShoppingBag => {
    // Assumption: quantity > 2, for same item with multiple of 2 * discount;
    const discount = 1
    let quantity = 0
    bag.Items.forEach((x: Item) => {
        quantity += +x.Quantity
    })
    const totalDiscount = Math.floor(quantity / 2) * discount
    return {
        ...bag,
        MultiBuyDiscount: multiBuyDiscount ? totalDiscount : 0,
        MultiBuyDiscountFormatted: multiBuyDiscount ? `£${totalDiscount.toFixed(2)}` : "",
    }
}

const addWelcomeChargesAndIncentives = (bag: ShoppingBag, welcomeOffer: boolean): ShoppingBag => {
    // Assumption: you can only get one type of incentive at a time
    const type = "PRO"
    let {ChargesAndIncentives} = bag
    if (!ChargesAndIncentives.map(x => x.Type).includes(type) && welcomeOffer) {
        const discount = 10
        const incentive = {
            AdditionalAmount: -discount,
            AdditionalAmountFormatted: `-£${discount.toFixed(2)}`,
            AdditionalCode: "UKCO1",
            MaximumOrderValue: 0,
            MinimumOrderValue: 15,
            OfferShortDescription: "Welcome Offer",
            OfferTypeDescription: "Welcome Offer",
            Type: "PRO",
        }

        ChargesAndIncentives.push(incentive)
    } else if (!welcomeOffer) {
        ChargesAndIncentives = ChargesAndIncentives.filter(x => x.Type !== type)
    }

    return {
        ...bag,
        ChargesAndIncentives: [...ChargesAndIncentives],
    }
}

const calculateTotal = (bag: ShoppingBag): ShoppingBag => {
    const total = calculate.total(bag.Items) || 0
    const discount = bag.MultiBuyDiscount
    // get all the incentives
    const {ChargesAndIncentives} = bag
    let incentives = 0
    ChargesAndIncentives.forEach(x => {
        incentives += x.AdditionalAmount
    })

    const finalOrderValue = +total > 0 ? +total - discount + incentives : 0

    return {
        ...bag,
        FinalOrderValue: finalOrderValue,
        FinalOrderValueFormatted: `£${finalOrderValue.toFixed(2)}`,
    }
}

const groupHelper = (items: Item[], newItem: Item) => {
    const foundItem = items.filter(
        x =>
            x.ItemID !== newItem.ItemID &&
            x.ItemNumber === newItem.ItemNumber &&
            x.SizeDescription === newItem.SizeDescription,
    )

    if (!foundItem.length) return [...items, newItem]
    const Quantity = newItem.Quantity + foundItem[0].Quantity

    const seletedItem = {...newItem, ItemID: foundItem[0].ItemID, Quantity}
    return [...items.filter(x => x.ItemID !== seletedItem.ItemID), seletedItem]
}

const BagTriggers = ({itemCount, bag}: Props) => {
    const w: any = window
    const [multiBuyDiscount, setMultiBuyDiscount] = useState(false)
    const [inStoreMessaging, setinStoreMessaging] = useState(false)
    const [welcomeOffer, setWelcomeOffer] = useState(false)
    const [withAlternativeMsg, setAlternativeMsg] = useState(false)

    const handleAdd = async () => {
        // TODO this hsould in theory call the BAG_ADD event
        // CALLING THE BAG/GET ONLY TO HAVE A TEMPLATE FOR MOCKING A BAG/ADD
        // const data = {} as AddBagContractModel
        // LoadShoppingBagApiData("", data)

        const response = await axios.get("/bag/get")

        const result = response.data
        const ItemID = itemCount + 1
        const CistStoreName = inStoreMessaging ? "LEICESTER - HIGH CROSS SHOPPING CENTRE" : ""
        const withAlternative = withAlternativeMsg ? 'Alternative ' : ''
        const Description =
            itemCount > 0
                ?`${withAlternative} Multicoloured very long legging Sleeve Essential one ten packs (3mths-7yrs) `
                : `${withAlternative} ${result.ShoppingBag.Items[0].Description}`
        const ProductName = "OLIVIA"
        const TPSearchDescription = "Sweetheart neck midi dress"
        let quantity = 0
        let newBag
        if (bag) {
            bag.Items.forEach((x: Item) => {
                quantity += +x.Quantity
            })
            let SizeDescription = ""
            if (!itemCount) SizeDescription = "10 S"
            else SizeDescription = +quantity % 2 === 0 ? "15 L" : "12 M"

            const newItem = {...result.ShoppingBag.Items[0], ItemID, SizeDescription, Description, TPSearchDescription, ProductName, CistStoreName}
            newBag = {...bag, Items: groupHelper(bag.Items, newItem)}
        } else newBag = {...result.ShoppingBag}

        // apply discount
        newBag = addMultiBuyDiscount(newBag, multiBuyDiscount)
        // apply welcome offer incentives
        newBag = addWelcomeChargesAndIncentives(newBag, welcomeOffer)
        // recalculate total
        newBag = calculateTotal(newBag)

        w.subjects["$ SHOPPING_BAG_ADD_CALLBACK"].next({
            success: true,
            data: {ShoppingBag: {...newBag, ItemCount: itemCount + 1}},
        })
    }

    const handleRemove = () => {
        // For Testing, remove the last items
        let newBag = {...bag}
        newBag.Items = bag.Items.filter((_, y) => y !== Object.keys(bag.Items).length - 1)
        let counter = 0
        newBag.Items.forEach(x => {
            counter += x.Quantity
        })

        // apply discount and recalculate total
        newBag = addMultiBuyDiscount(newBag, multiBuyDiscount)
        // apply welcome offer incentives
        newBag = addWelcomeChargesAndIncentives(newBag, welcomeOffer)
        // recalculate total
        newBag = calculateTotal(newBag)

        w.subjects["$ SHOPPING_BAG_ADD_CALLBACK"].next({
            success: true,
            data: {ShoppingBag: {...newBag, ItemCount: counter}},
        })
    }
    return (
        <>
            <div style={style}>
                <button type="button" style={btnStyle} onClick={handleAdd}>
                    Bag+
                </button>
                <button type="button" style={btnStyle} onClick={handleRemove}>
                    Bag-
                </button>
                <span> {itemCount}</span>
            </div>
            <div style={promotionalStyle}>
                <div>
                    <input
                        type="checkbox"
                        id="prmSaving"
                        name="prmSaving"
                        value="prmSaving"
                        onChange={() => setMultiBuyDiscount(!multiBuyDiscount)}
                    />
                    <span> Multibuy discount</span>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="inStoreMsg"
                        name="inStoreMsg"
                        value="inStoreMsg"
                        onChange={() => setinStoreMessaging(!inStoreMessaging)}
                    />
                    <span>In store messaging </span>
                </div>

                <div>
                    <input
                        type="checkbox"
                        id="welcomeOffer"
                        name="welcomeOffer"
                        value="welcomeOffer"
                        onChange={() => setWelcomeOffer(!welcomeOffer)}
                    />
                    <span> Welcome offer</span>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="withAlternativeMsg"
                        name="withAlternativeMsg"
                        value="withAlternativeMsg"
                        onChange={() => setAlternativeMsg(!withAlternativeMsg)}
                    />
                    <span> With Alt Description</span>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: State) => {
    return {...state.shoppingBag}
}
export default connect(mapStateToProps)(BagTriggers)

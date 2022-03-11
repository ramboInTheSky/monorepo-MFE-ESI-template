type Items = any[]

const chunkArray = (items: Items, splitNo: number): Items => {
    const allChunkedItems: Items = []
    let chunkedItems: Items = []
    items.forEach((item, index) => {
        chunkedItems.push(item)
        const isSplitNo = (index + 1) % splitNo === 0
        if (isSplitNo) {
            allChunkedItems.push(chunkedItems)
            chunkedItems = []
        }
    })
    return allChunkedItems
}

export default chunkArray

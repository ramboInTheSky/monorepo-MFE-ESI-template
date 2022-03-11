export interface IDictionary<T> {
    AddOrUpdate(key: string, value: T)
    ContainsKey(key: string): boolean
    Count(): number
    Item(key: string): T
    Keys(): string[]
    Values(): T[]
}

export class Dictionary<T> implements IDictionary<T> {
    public items: {[index: string]: T} = {}
    private count = 0

    public ContainsKey(key: string): boolean {
        return !!this.items[key]
    }

    public Count(): number {
        return this.count
    }

    public AddOrUpdate(key: string, value: T) {
        if (!this.items[key]) this.count += 1

        this.items[key] = value
    }

    public Item(key: string): T {
        return this.items[key]
    }

    public Keys(): string[] {
        const keySet: string[] = []

        Object.keys(this.items).forEach(key => {
            if (this.items[key]) {
                keySet.push()
            }
        })

        return keySet
    }

    public Values(): T[] {
        const values: T[] = []

        Object.keys(this.items).forEach(key => {
            if (this.items[key]) {
                values.push(this.items[key])
            }
        })

        return values
    }
}

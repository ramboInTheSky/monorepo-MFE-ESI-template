import NodeCache from "node-cache"

export class Cache {
    cache: NodeCache

    constructor() {
        this.cache = new NodeCache({useClones: false})
    }

    Set(key, value) {
        this.cache.set(key, value, 0)
        return this.Get(key)
    }

    Get(key) {
        return this.cache.get(key)
    }
}

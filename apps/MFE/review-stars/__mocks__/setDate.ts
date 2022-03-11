export const mockDateConstructor = (setDate: Date) => {
    Date = class extends Date {
        constructor() {
            super()
            return setDate
        }
    } as DateConstructor
}

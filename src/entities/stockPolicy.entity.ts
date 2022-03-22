export default class StockPolicy {
    id: number
    critical: number
    good: number
    excellent: number
    createdAt: Date
    updatedAt?: Date

    constructor(
        props: Omit<StockPolicy, 'id' | 'createdAt' | 'updatedAt'>,
        id?: number
    ) {
        Object.assign(this, props)

        this.createdAt = new Date()
    }
}
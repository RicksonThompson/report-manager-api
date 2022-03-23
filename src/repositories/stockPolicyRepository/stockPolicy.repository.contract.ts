import StockPolicy from "../../entities/stockPolicy.entity"

export default interface IStockPolicyRepository {
    create(create: StockPolicy): Promise<StockPolicy>
    delete(id: number): Promise<any>
    findOne(): Promise<undefined | StockPolicy>
    update(update: StockPolicy): Promise<StockPolicy>
}

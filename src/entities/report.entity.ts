export default class Report {
  id: number
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  createdAt: Date
  updatedAt?: Date

  constructor(
    props: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>,
    id?: number
  ) {
    Object.assign(this, props)

    this.createdAt = new Date()
  }
}
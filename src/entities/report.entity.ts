import { EReportStatus } from "@prisma/client"

export default class Report {
  id: number
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  status: EReportStatus
  createdAt: Date
  updatedAt?: Date

  constructor(
    props: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
    status: EReportStatus,
    id?: number
  ) {
    Object.assign(this, props)

    this.status = status

    this.createdAt = new Date()
  }
}
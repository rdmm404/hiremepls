import type { ApplicationSummary } from './ApplicationSummary.ts'

export type PaginatedResponseApplicationSummary = {
  /**
   * @type integer
   */
  page: number
  next_page: number | null
  /**
   * @type integer
   */
  total_pages: number
  /**
   * @type integer
   */
  item_count: number
  /**
   * @type array
   */
  data: ApplicationSummary[]
}
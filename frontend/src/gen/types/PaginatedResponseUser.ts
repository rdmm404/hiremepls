import type { User } from './User.ts'

export type PaginatedResponseUser = {
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
  data: User[]
}
export type Compensation = {
  currency?: string | null
  hiring_bonus?: number | null
  equity?: boolean | null
  minimum?: number | null
  maximum?: number | null
  details?: string | null
  /**
   * @type array | undefined
   */
  benefits?: string[]
  /**
   * @type integer
   */
  id: number
}
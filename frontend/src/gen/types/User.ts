export type User = {
  /**
   * @type integer
   */
  id: number
  /**
   * @type string
   */
  name: string
  /**
   * @type string
   */
  last_name: string
  /**
   * @type string
   */
  email: string
  /**
   * @default false
   * @type boolean | undefined
   */
  is_superuser?: boolean
}
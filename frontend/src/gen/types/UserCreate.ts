export type UserCreate = {
  id?: number | null
  created_at?: string | null
  updated_at?: string | null
  /**
   * @type string
   */
  name: string
  /**
   * @type string
   */
  last_name: string
  /**
   * @type string, email
   */
  email: string
  /**
   * @default false
   * @type boolean | undefined
   */
  is_superuser?: boolean
  /**
   * @type string
   */
  password: string
}
export type UserRegistration = {
  /**
   * @type string, email
   */
  email: string
  /**
   * @type string
   */
  password: string
  /**
   * @type string
   */
  password_confirm: string
  /**
   * @description User\'s first name
   * @minLength 1
   * @type string
   */
  name: string
  /**
   * @description User\'s last name
   * @minLength 1
   * @type string
   */
  last_name: string
}
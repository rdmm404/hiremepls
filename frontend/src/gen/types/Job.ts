import type { Company } from './Company.ts'
import type { Compensation } from './Compensation.ts'

export const jobJobTypeEnum = {
  full_time: 'full_time',
  part_time: 'part_time',
  contract: 'contract',
} as const

export type JobJobTypeEnum = (typeof jobJobTypeEnum)[keyof typeof jobJobTypeEnum]

export const jobModalityEnum = {
  remote: 'remote',
  in_office: 'in_office',
  hybrid: 'hybrid',
} as const

export type JobModalityEnum = (typeof jobModalityEnum)[keyof typeof jobModalityEnum]

export type Job = {
  /**
   * @type string
   */
  job_title: string
  /**
   * @minLength 1
   * @maxLength 2083
   * @type string, uri
   */
  job_url: string
  /**
   * @type string
   */
  job_type: JobJobTypeEnum
  /**
   * @type string
   */
  llm_summary: string
  /**
   * @type string
   */
  job_description: string
  /**
   * @type array | undefined
   */
  requirements?: string[]
  /**
   * @type array | undefined
   */
  skills?: string[]
  /**
   * @type array | undefined
   */
  modality?: JobModalityEnum[]
  /**
   * @type string
   */
  location: string
  other_details?: string | null
  /**
   * @type integer
   */
  id: number
  /**
   * @type object
   */
  compensation: Compensation
  /**
   * @type object
   */
  company: Company
}
import type { Company } from './Company.ts'
import type { Compensation } from './Compensation.ts'

export enum JobJobTypeEnum {
  'full_time' = 'full_time',
  'part_time' = 'part_time',
  'contract' = 'contract',
}

export enum JobModalityEnum {
  'remote' = 'remote',
  'in_office' = 'in_office',
  'hybrid' = 'hybrid',
}

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
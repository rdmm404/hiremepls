import type { Company } from './Company.ts'
import type { CompensationSummary } from './CompensationSummary.ts'

export enum JobSummaryModalityEnum {
  'remote' = 'remote',
  'in_office' = 'in_office',
  'hybrid' = 'hybrid',
}

export type JobSummary = {
  /**
   * @type integer
   */
  id: number
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
  llm_summary: string
  /**
   * @type array
   */
  modality: JobSummaryModalityEnum[]
  /**
   * @type string
   */
  location: string
  /**
   * @type object
   */
  compensation: CompensationSummary
  /**
   * @type object
   */
  company: Company
}
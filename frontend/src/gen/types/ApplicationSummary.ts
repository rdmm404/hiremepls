import type { ApplicationStatus } from './ApplicationStatus.ts'
import type { JobSummary } from './JobSummary.ts'

export type ApplicationSummary = {
  /**
   * @type integer
   */
  id: number
  /**
   * @type string
   */
  status: ApplicationStatus
  fit?: number | null
  /**
   * @type object
   */
  job: JobSummary
}
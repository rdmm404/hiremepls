import type { ApplicationStatus } from './ApplicationStatus.ts'
import type { Job } from './Job.ts'

export type Application = {
  /**
   * @type string | undefined
   */
  status?: ApplicationStatus
  interview_rounds?: number | null
  current_round?: number | null
  notes?: string | null
  fit?: number | null
  resume_used?: string | null
  /**
   * @type integer
   */
  id: number
  /**
   * @type object
   */
  job: Job
}
import type { ApplicationStatus } from './ApplicationStatus.ts'

export type LibModelApplicationsApplication = {
  id?: number | null
  created_at?: string | null
  updated_at?: string | null
  /**
   * @type string | undefined
   */
  status?: ApplicationStatus
  interview_rounds?: number | null
  current_round?: number | null
  notes?: string | null
  fit?: number | null
  resume_used?: string | null
  user_id?: number | null
  job_id?: number | null
}
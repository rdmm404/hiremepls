import type { ApplicationStatus } from './ApplicationStatus.ts'

export type UpdateApplicationPartial = {
  status?: ApplicationStatus | null
  interview_rounds?: number | null
  current_round?: number | null
  notes?: string | null
  fit?: number | null
  resume_used?: string | null
}
import type { ApplicationAverages } from './ApplicationAverages.ts'

/**
 * @description Statistics about a user\'s applications.
 */
export type ApplicationStats = {
  /**
   * @type integer
   */
  total_applications: number
  /**
   * @type object
   */
  status_counts: {
    [key: string]: number
  }
  /**
   * @type integer
   */
  recent_applications_count: number
  /**
   * @type integer
   */
  active_applications_count: number
  /**
   * @type object
   */
  averages: ApplicationAverages
}
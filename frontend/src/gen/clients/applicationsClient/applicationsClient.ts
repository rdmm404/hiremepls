import { applicationsCreateFromJobUrl } from './applicationsCreateFromJobUrl.ts'
import { applicationsGetApplication } from './applicationsGetApplication.ts'
import { applicationsListApplications } from './applicationsListApplications.ts'

export function applicationsClient() {
  return { applicationsCreateFromJobUrl, applicationsGetApplication, applicationsListApplications }
}
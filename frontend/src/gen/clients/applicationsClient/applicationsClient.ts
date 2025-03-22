import { applicationsCreateFromJobUrl } from './applicationsCreateFromJobUrl.ts'
import { applicationsGetApplication } from './applicationsGetApplication.ts'

export function applicationsClient() {
  return { applicationsCreateFromJobUrl, applicationsGetApplication }
}
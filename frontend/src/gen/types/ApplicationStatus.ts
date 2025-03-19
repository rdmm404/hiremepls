export const applicationStatusEnum = {
  Pending: 'Pending',
  Applied: 'Applied',
  Received: 'Received',
  'In Assesment': 'In Assesment',
  'In Screening': 'In Screening',
  Interviewing: 'Interviewing',
  'Offer Received': 'Offer Received',
  Hired: 'Hired',
  Rejected: 'Rejected',
  Ghosted: 'Ghosted',
} as const

export type ApplicationStatusEnum = (typeof applicationStatusEnum)[keyof typeof applicationStatusEnum]

export type ApplicationStatus = ApplicationStatusEnum
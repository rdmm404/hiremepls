export enum ApplicationStatusEnum {
  'Pending' = 'Pending',
  'Applied' = 'Applied',
  'Received by Employer' = 'Received by Employer',
  'In Assessment' = 'In Assessment',
  'In Screening' = 'In Screening',
  'Interviewing' = 'Interviewing',
  'Offer Received' = 'Offer Received',
  'Negotiating' = 'Negotiating',
  'Offer Declined' = 'Offer Declined',
  'Hired' = 'Hired',
  'Rejected' = 'Rejected',
  'Ghosted' = 'Ghosted',
}

export type ApplicationStatus = ApplicationStatusEnum
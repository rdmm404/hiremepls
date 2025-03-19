export enum ApplicationStatusEnum {
  'Pending' = 'Pending',
  'Applied' = 'Applied',
  'Received' = 'Received',
  'In Assesment' = 'In Assesment',
  'In Screening' = 'In Screening',
  'Interviewing' = 'Interviewing',
  'Offer Received' = 'Offer Received',
  'Hired' = 'Hired',
  'Rejected' = 'Rejected',
  'Ghosted' = 'Ghosted',
}

export type ApplicationStatus = ApplicationStatusEnum
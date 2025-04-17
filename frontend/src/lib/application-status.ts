import { ApplicationStatusEnum } from "@/gen";
import { type VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export function getStatusBadgeVariant(
  status: ApplicationStatusEnum
): BadgeVariant {
  switch (status) {
    // Initial states
    case ApplicationStatusEnum.Pending:
    case ApplicationStatusEnum.Applied:
    case ApplicationStatusEnum["Received by Employer"]:
      return "default";

    // Active states
    case ApplicationStatusEnum["In Assessment"]:
    case ApplicationStatusEnum["In Screening"]:
    case ApplicationStatusEnum.Interviewing:
      return "neonBlue";

    // Positive outcomes
    case ApplicationStatusEnum["Offer Received"]:
    case ApplicationStatusEnum.Negotiating:
    case ApplicationStatusEnum.Hired:
      return "secondary";

    // Negative outcomes
    case ApplicationStatusEnum.Rejected:
    case ApplicationStatusEnum.Ghosted:
    case ApplicationStatusEnum["Offer Declined"]:
      return "destructive";

    default:
      return "outline";
  }
}

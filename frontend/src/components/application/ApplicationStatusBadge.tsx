import { ApplicationStatusEnum } from "@/gen";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatusEnum;
  className?: string;
}
export function ApplicationStatusBadge({
  status,
  className: classNameOverride,
}: ApplicationStatusBadgeProps) {
  let variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "neonBlue" = "outline";
  const className = cn(classNameOverride, "text-sm font-medium");

  switch (status) {
    // Initial states
    case ApplicationStatusEnum.Pending:
    case ApplicationStatusEnum.Applied:
    case ApplicationStatusEnum["Received by Employer"]:
      variant = "default";
      break;

    // Active states
    case ApplicationStatusEnum["In Assessment"]:
    case ApplicationStatusEnum["In Screening"]:
    case ApplicationStatusEnum.Interviewing:
      variant = "neonBlue";
      break;

    // Positive outcomes
    case ApplicationStatusEnum["Offer Received"]:
      variant = "secondary";
      break;
    case ApplicationStatusEnum.Negotiating:
      variant = "secondary";
      break;
    case ApplicationStatusEnum.Hired:
      variant = "secondary";
      break;

    // Negative outcomes
    case ApplicationStatusEnum.Rejected:
    case ApplicationStatusEnum.Ghosted:
    case ApplicationStatusEnum["Offer Declined"]:
      variant = "destructive";
      break;

    default:
      variant = "outline";
  }

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}

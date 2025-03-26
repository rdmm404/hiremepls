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
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
  let className = cn(classNameOverride, "text-sm font-medium");

  switch (status) {
    // Initial states
    case ApplicationStatusEnum.Pending:
    case ApplicationStatusEnum.Applied:
    case ApplicationStatusEnum["Received by Employer"]:
      variant = "secondary";
      break;

    // Active states
    case ApplicationStatusEnum["In Assessment"]:
    case ApplicationStatusEnum["In Screening"]:
    case ApplicationStatusEnum.Interviewing:
      variant = "default";
      break;

    // Positive outcomes
    case ApplicationStatusEnum["Offer Received"]:
      variant = "default";
      className += " bg-primary/80 hover:bg-primary/70";
      break;
    case ApplicationStatusEnum.Negotiating:
      variant = "default";
      className += " bg-primary/90 hover:bg-primary/80";
      break;
    case ApplicationStatusEnum.Hired:
      variant = "default";
      className += " bg-primary hover:bg-primary/90";
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

import { ApplicationStatusEnum } from "@/gen";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getStatusBadgeVariant } from "@/lib/application-status";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatusEnum;
  className?: string;
}

export function ApplicationStatusBadge({
  status,
  className: classNameOverride,
}: ApplicationStatusBadgeProps) {
  const className = cn(classNameOverride, "text-sm font-medium");
  const variant = getStatusBadgeVariant(status);

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}

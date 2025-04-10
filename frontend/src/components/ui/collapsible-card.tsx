import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapsibleCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleCard({
  title,
  defaultOpen = true,
  children,
  className,
  ...props
}: CollapsibleCardProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group">
      <Card className={className} {...props}>
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer">
            <CardTitle>{title}</CardTitle>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

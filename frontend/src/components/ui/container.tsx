import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva("size-full p-6 md:px-10 max-w-[96rem]", {
  variants: {
    width: {
      full: "",
      "3/4": "@3xl:max-w-3/4 @3xl:px-0",
    },
  },
  defaultVariants: {
    width: "full",
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode;
}

export function Container({
  children,
  className,
  width,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ width, className }))} {...props}>
      {children}
    </div>
  );
}

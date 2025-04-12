import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"
import { CircleAlert } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      icons={{
        error: (
          <CircleAlert strokeWidth={2} className="size-5 text-destructive" />
        ),
      }}
      {...props}
    />
  );
};

export { Toaster }

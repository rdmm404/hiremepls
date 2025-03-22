import { useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthLogout } from "@/gen";

export function LogoutButton() {
  const router = useRouter();

  const logoutMutation = useAuthLogout({
    mutation: {
      onSuccess: () => router.navigate({ to: "/login" }),
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined);
  };

  return (
    <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
      {logoutMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        "Logout"
      )}
    </Button>
  );
}

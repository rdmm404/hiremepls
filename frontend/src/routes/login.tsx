import type React from "react";
import { useState } from "react";
import {
  createFileRoute,
  useRouter,
  Navigate,
  useLoaderData,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthLoginAccessToken } from "@/gen";

type LoginParams = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  component: LoginForm,
  validateSearch: (search: Record<string, unknown>): LoginParams => ({
    redirect: search?.redirect as string | undefined,
  }),
});

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const search = Route.useSearch();

  const loginMutation = useAuthLoginAccessToken({
    mutation: {
      onSuccess: () => {
        router.navigate({ to: search.redirect || "/" });
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      data: {
        username: email,
        password,
      },
    });
  };

  const currentUser = useLoaderData({ from: "__root__" });
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 space-y-6 rounded-lg border border-foreground/10"
      >
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-foreground/20 placeholder/50"
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-foreground/20 placeholder/50"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/80"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}

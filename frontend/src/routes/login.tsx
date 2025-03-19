import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuthLoginAccessToken } from "@/gen";

export const Route = createFileRoute("/login")({
  component: LoginForm,
});

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useAuthLoginAccessToken({
    mutation: {
      onSuccess: () => console.log("mutation complete"),
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    loginMutation.mutate({
      data: {
        username: email,
        password,
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loginMutation.isPending && <p>Logging in...</p>}
      {loginMutation.isError ||
        (loginMutation.isSuccess && !loginMutation.data.access_token && (
          <p>Something went wrong</p>
        ))}
      {loginMutation.isSuccess && loginMutation.data.access_token && (
        <p>Logged in!!!</p>
      )}
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
        <Button type="submit" className="w-full bg-primary hover:bg-primary/80">
          Login
        </Button>
      </form>
    </div>
  );
}

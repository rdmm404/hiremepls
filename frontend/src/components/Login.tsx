"use client";

import type React from "react";

import { useState } from "react";

import { useLoginLoginAccessToken } from "@/gen/hooks/useLoginLoginAccessToken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#21222c] text-[#e6e0e9]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 space-y-6 rounded-lg border border-[#e6e0e9]/10"
      >
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#21222c] border-[#e6e0e9]/20 text-[#e6e0e9] placeholder:text-[#e6e0e9]/50"
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#21222c] border-[#e6e0e9]/20 text-[#e6e0e9] placeholder:text-[#e6e0e9]/50"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#BD93F9] hover:bg-[#BD93F9]/80 text-[#21222c]"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

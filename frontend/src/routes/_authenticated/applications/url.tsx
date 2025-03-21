import type React from "react";
import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApplicationsCreateFromJobUrl } from "@/gen";

export const Route = createFileRoute("/_authenticated/applications/url")({
  component: CreateApplicationWithUrl,
});

function CreateApplicationWithUrl() {
  const router = useRouter();
  const mutation = useApplicationsCreateFromJobUrl({
    mutation: {
      onSuccess: (data) => {
        toast.success("Application created");
        router.navigate({
          to: "/applications/$applicationId",
          params: { applicationId: data.id.toString() },
        });
      },
      onError: (error) =>
        toast.error(`Something went wrong`, {
          description: error.response?.data.detail![0].msg,
        }), // add a toast here
    },
  });
  const [url, setUrl] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ data: { url } });
  };

  return (
    <div className="flex items-center justify-center grow">
      <form onSubmit={handleFormSubmit}>
        <div className="flex gap-2">
          <Input
            type="text"
            className="w-90"
            placeholder="Enter the job description url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="animate-spin" />}Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

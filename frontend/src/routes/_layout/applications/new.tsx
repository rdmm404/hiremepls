import type React from "react";
import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApplicationsCreateFromJobUrl } from "@/gen";

export const Route = createFileRoute("/_layout/applications/new")({
  component: CreateApplicationWithUrl,
  loader: () => ({
    crumb: "Create",
  }),
});

function CreateApplicationWithUrl() {
  const router = useRouter();
  const mutation = useApplicationsCreateFromJobUrl({
    mutation: {
      onSuccess: (data) => {
        toast.info("Job application registered successfully", {
          action: {
            label: "View",
            onClick: () =>
              router.navigate({
                to: "/applications/$applicationId",
                params: { applicationId: data.id.toString() },
              }),
          },
        });

      },
      onError: (error) =>
        toast.error(`Something went wrong`, {
          description: error.response?.data.detail![0].msg,
        }),
    },
  });
  const [url, setUrl] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ data: { url } });
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      <div className="flex flex-col px-4 @lg:flex-row gap-2 @lg:px-0 w-full justify-center items-center">
        <Input
          type="text"
          className="w-full max-w-90"
          placeholder="Enter the job description url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          disabled={mutation.isPending}
          className="max-w-90 @max-lg:w-full"
        >
          {mutation.isPending && <Loader2 className="animate-spin" />}Submit
        </Button>
      </div>
    </form>
  );
}

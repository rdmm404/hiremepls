import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApplicationsCreateFromJobUrl } from "@/gen";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Container } from "@/components/ui/container";
const formSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL")
    .refine(
      (url) => {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.protocol === "https:";
        } catch {
          return false;
        }
      },
      {
        message: "Please enter a valid HTTP or HTTPS URL",
      }
    ),
});

export const Route = createFileRoute("/_layout/applications/new")({
  component: CreateApplicationWithUrl,
  loader: () => ({
    crumb: "Create",
  }),
});

function CreateApplicationWithUrl() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

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
        form.reset();
      },
      onError: (error) =>
        toast.error(`Something went wrong`, {
          description: error.response?.data.detail![0].msg,
        }),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate({ data: { url: data.url } });
  };

  return (
    <Container width="full">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="size-full flex flex-col px-4 @lg:flex-row gap-2 @lg:px-0 w-full justify-center items-center"
        >
          <div className="w-full max-w-96">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter the job description url"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="max-w-96 @max-lg:w-full"
          >
            {mutation.isPending && <Loader2 className="mr-2 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </Container>
  );
}

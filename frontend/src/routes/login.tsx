import {
  createFileRoute,
  useRouter,
  Navigate,
  useLoaderData,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthLoginAccessToken } from "@/gen";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginParams = {
  redirect?: string;
};

// TODO: ADD ERROR MESSAGES

export const Route = createFileRoute("/login")({
  component: LoginForm,
  validateSearch: (search: Record<string, unknown>): LoginParams => ({
    redirect: search?.redirect as string | undefined,
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const search = Route.useSearch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useAuthLoginAccessToken({
    mutation: {
      onSuccess: () => {
        router.navigate({ to: search.redirect || "/" });
      },
      onError: (error) => {
        toast.error("Login failed", {
          description:
            (error.response?.data?.detail as unknown as string) ||
            "An error occurred",
        });
      },
    },
  });

  const currentUser = useLoaderData({ from: "__root__" });
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit((data) => {
            loginMutation.mutate({
              data: {
                username: data.username,
                password: data.password,
              },
            });
          })}
          className="w-full max-w-sm p-6 space-y-6 rounded-lg border border-foreground/10"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="border-foreground/20 placeholder/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="border-foreground/20 placeholder/50"
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
      </Form>
    </div>
  );
}

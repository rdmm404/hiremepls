import {
  createFileRoute,
  useRouter,
  Navigate,
  useLoaderData,
  Link,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthRegister } from "@/gen";
import type { ValidationError } from "@/gen";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    name: z
      .string()
      .min(1, "First name is required")
      .refine((val) => !/\d/.test(val), "Name cannot contain numbers"),
    last_name: z
      .string()
      .min(1, "Last name is required")
      .refine((val) => !/\d/.test(val), "Last name cannot contain numbers"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()+=\-_,.?":{}|<>[\]/~`]/,
        "Password must contain at least one special character"
      ),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  });

export const Route = createFileRoute("/signup")({
  component: RegisterForm,
});

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      last_name: "",
      password: "",
      password_confirm: "",
    },
  });

  const registerMutation = useAuthRegister({
    mutation: {
      onSuccess: (_, { data }) => {
        toast.success(`Welcome to HireMePls, ${data.name}!`, {
          description:
            "Your account has been created successfully. Let's start tracking those job applications!",
        });
        router.navigate({ to: "/applications/new" });
      },
      onError: (error) => {
        const detail = error.response?.data?.detail;
        const message = Array.isArray(detail)
          ? detail.map((err: ValidationError) => err.msg).join(", ")
          : detail || "An error occurred";

        toast.error("Registration failed", {
          description: message,
        });
      },
    },
  });

  const currentUser = useLoaderData({ from: "__root__" });
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit((data) => {
            registerMutation.mutate({
              data: {
                ...data,
                email: data.email.trim(),
                name: data.name.trim(),
                last_name: data.last_name.trim(),
              },
            });
          })}
          className="w-full max-w-sm p-6 space-y-6 rounded-lg border border-foreground/10"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      autoFocus
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
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
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password_confirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="border-foreground/20 placeholder/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription className="text-xs">
            Password must:
            <ul className="list-disc list-inside pl-1 space-y-1">
              <li>Be at least 8 characters long</li>
              <li>Contain at least one uppercase letter</li>
              <li>Contain at least one number</li>
              <li>Contain at least one special character</li>
            </ul>
          </FormDescription>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

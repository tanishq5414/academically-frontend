/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import { signUp } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { FormField, FormLabel } from "@/components/ui/form";
import { FormControl, FormMessage } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function UserSignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const responseData = await signUp(values.name, values.email, values.password);
      return responseData;
    },
    onSuccess: (responseData: any) => {
      localStorage.setItem("token", responseData.data.token.token);
      localStorage.setItem("user", JSON.stringify(responseData.data.user));
      localStorage.setItem("userId", responseData.data.token.userId);
      toast({
        title: "Success",
        description: "Welcome to Academically Global!",
        variant: "default",
      });
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response.data.error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    className="border-2 border-gray-300 rounded-md h-12"
                    required
                    placeholder="John Doe"
                    type="text"
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    className="border-2 border-gray-300 rounded-md h-12"
                    required
                    placeholder="name@example.com"
                    type="email"
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    className="border-2 border-gray-300 rounded-md h-12"
                    placeholder="Enter your password"
                    type="password"
                    disabled={mutation.isPending}
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    className="border-2 border-gray-300 rounded-md h-12"
                    placeholder="Confirm your password"
                    type="password"
                    disabled={mutation.isPending}
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-purple-500 text-white hover:bg-purple-600 h-12" type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader className="mr-2 h-4 w-4" />
            )}
            Sign Up
          </Button>
        </form>
      </FormProvider>
    </div>
  );
} 
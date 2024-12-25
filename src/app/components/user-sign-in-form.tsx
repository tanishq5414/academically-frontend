"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import router from "next/router";
import { Form, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { FormField, FormLabel } from "@/components/ui/form";
import { FormControl, FormMessage } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function UserSignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post('/api/auth/signin', {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      return response.data;
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <Form>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
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
          <Button className="w-full bg-purple-500 text-white hover:bg-purple-600 h-12" type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader className="mr-2 h-4 w-4" />
            )}
            Sign In
          </Button>
        </form>
      </Form>
      </FormProvider>
    </div>
  );
}

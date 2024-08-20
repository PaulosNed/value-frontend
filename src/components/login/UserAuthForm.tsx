"use client";

import * as React from "react";
import { Icons } from "@/components/icons";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "@/store/users/usersApi";
import { useRouter } from 'next/navigation'

import { useToast } from "@/components/ui/use-toast"
import { jwtDecode } from "jwt-decode";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [login, { data, error, isError, isSuccess }] = useLoginMutation();
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const requestBody = {
      username: values.email,
      password: values.password,
    }

    const response: any = await login(requestBody);
    console.log(isSuccess)

    if (!response.error) {
      localStorage.setItem("access", response.data.access)
      localStorage.setItem("refresh", response.data.refresh)
      
      console.log(localStorage.getItem("access"));
      
      const decoded: any = jwtDecode(response.data.access)
      const user = decoded.user
      
      console.log(decoded)
      toast({
        variant: "default",
        title: `Welcome ${user.first_name} ${user.last_name}` ,
        description: `you have successfully signed in`,
      })
      router.push('/')
      setIsLoading(false);
    } else {
      console.log("Error found", response)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${response.error.data.detail}`,
      })
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="psasword"
                        placeholder="Password"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>
    </Form>
  );
}

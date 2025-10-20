"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/server/schemas";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);

  // 1 define your form from zod schema
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUsuario = async (data: {
    // data its the payload from zod and what is required in the api
    email: string;
    password: string;
  }) => {
    try {
       
      const response = await axios.post(
        `http://localhost:8000/api/login`, data,  
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //  save jwt in cookies
      if (response) {
        Cookies.set("token", response.data.token, { expires: 1 / 24, path: "/" });
        form.reset();
        toast.success("Login realizado com sucesso!", {
          duration: 1000,
          position: "top-right",
        });
        router.push("/homepage");
      } else {
        console.log("Erro no login");
      }
    } catch (error: unknown) {
      // error handling
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Erro no cadastro";

        if (msg.toLowerCase().includes("email")) {
          form.setError("email", {
            type: "server",
            message: msg,
          });

          
        } else if (msg.toLowerCase().includes("password")) {
          form.setError("password", {
            type: "server",
            message: msg,
          });
        }
      }
    }
  };

  // 2 define submit handler
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await loginUsuario(values);
  };

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto space-y-4 p-4 mt-25 border-1 w-[400px] lg:w-[400px] h-[570px] relative"
      data-aos="fade-out"
    >
      <h1 className="text-[22px] mb-6 font-semibold absolute top-13 items-center">
        Time Capsule
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md ">email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    className="w-[300px]"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md ">password</FormLabel>
                <div className="relative w-[300px]">
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field}
                      type={seePassword ? "text" : "password"}
                      className="w-[300px] "
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setSeePassword(!seePassword)}
                    className="absolute inset-y-0 right-3  flex items-center"
                  >
                    {seePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Login</Button>
          <Link
            href="signUp"
            className="text-blue-400 underline items-center justify-center flex"
          >
            Do not have an account? Sign up now
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default Page;

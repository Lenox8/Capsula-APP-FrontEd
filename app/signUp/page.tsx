"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/server/schemas";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [errorMessage, setErroMessage] = useState();
  const [showSenha, setShowSenha] = useState(false);

  // 1 define your form from zod schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      password: "",
    },
  });

  const cadastrarUsuario = async (data: {
    nome: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000//api/cadastrar',
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      form.reset();
      toast.success("Cadastro realizado com sucesso!", {
        duration: 2000,
        position: "top-right",
      });
      router.push("/login");
    } catch (error: unknown) {
      // error handling
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Erro no cadastro";
        const sugestoes = error.response?.data?.sugestoes || [];
        // erro email identico ou exists
        setErroMessage(msg);
        if (msg.toLowerCase().includes("email")) {
          form.setError("email", {
            type: "server",
            message: msg,
          });
          // erro password
        } else if (msg.toLowerCase().includes("password")) {
          form.setError("password", {
            type: "server",
            message: sugestoes.join(","),
          });
        }
      }
    }
  };

  // 2 define submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log("Valores do form", values);
    await cadastrarUsuario(values);
  };

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto space-y-4 p-6 mt-25 border-1 w-[430px] lg:w-[400px] h-[570px] relative"
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
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md ">username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    type="text"
                    className="w-[300px] "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
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
                      type={showSenha ? "text" : "password"}
                      className="w-[300px]"
                    />
                  </FormControl>
                  <button type="button"
                  className="absolute right-3 inset-y-0"
                  onClick={() => setShowSenha(!showSenha)}
                  >
                    {showSenha ? <EyeOff size={20}/>: <Eye size={20}/>}
                  </button>
                </div>
                <FormMessage className="w-[300px]" />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Sign Up</Button>
          <Link
            href="login"
            className="text-blue-400 underline items-center justify-center flex"
          >
            already have and account
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default Page;

"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import z from "zod";
import { criarCapsula } from "@/server/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import axios from "axios";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const [capsuleData, setCapsulesData] = useState([]);
    const router = useRouter()

  const form = useForm<z.infer<typeof criarCapsula>>({
    resolver: zodResolver(criarCapsula),
    defaultValues: {
      content: "",
      dataEnvio: "",
      emailDestinatario: "",
    },
  });
  const createCapsula = async (data: {
    content: string;
    dataEnvio: string;
    emailDestinatario: string;
  }) => {
    try {
      const token = Cookies.get("token");
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (token) {
        const res = await axios.post(
          'http://localhost:8000/api/criarCapsula',
          data,
          {
            headers: { Authorization: `Bearer: ${token}` },
          }
        );
        setCapsulesData(res.data);
        router.push("/dashboard")
      } else {
        console.log("Unauthorized, Login first");
      }
      alert("Capsula criada com sucesso")
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (values: z.infer<typeof criarCapsula>) => {
    await createCapsula(values);
  };

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto space-y-4 p-4 mt-25 border-1 w-[400px] lg:w-[400px] h-[570px] "
      data-aos="fade-out"
    >
      <h1 className="text-[22px] mb-6 font-semibold absolute top-14 items-center">
        Create Time Capsule
      </h1>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-2"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capsule content</FormLabel>
                <FormControl>
                  <Input
                    placeholder="capsule content"
                    {...field}
                    className="w-[300px]"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dataEnvio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de envio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[300px]"
                    type="datetime-local"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailDestinatario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email do destinatario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email destinatario"
                    {...field}
                    className="w-[300px]"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Edit, Plus, StopCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export interface Capsula {
  _id: string;
  userId: string;
  content: string;
  dataEnvio: string;
  status: string;
  emailDestinatario: string;
}
const Capsulas = () => {
  const token = Cookies.get("token");
  const [capsuleData, setCapsulesData] = useState<Capsula[]>([]);

  useEffect(() => {
    const retornocapsulas = async () => {
      if (token) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${apiUrl}/api/capsulas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCapsulesData(response.data);
      }
    };
    retornocapsulas();
  }, [token]);

  const cancelarCapsula = async (data: { id: string }) => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const res = await axios.patch(
          `${apiUrl}/api/cancelarCapsula/${data.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCapsulesData((prev) =>
          prev.map((c) => (c._id === data.id ? res.data : c))
        );

        toast.success("Envio de capsula cancelado com sucesso", {
          duration: 2000,
          position: "bottom-right",
        });
      } catch (error) {
        console.log(error);
        toast.error("Erro ao cancelar capsula", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } else {
      console.log("Unauthorized!");
    }
  };
  const apagarCapsula = async (data: { id: string }) => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const reponse = await axios.delete(
          `${apiUrl}/api/apagarCapsula/${data.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // atualizar state removendo capsula apagada
        setCapsulesData((prev) => prev.filter((c) => c._id !== data.id));

        toast.success("Capsula apagada com sucesso", {
          duration: 2000,
          position: "bottom-right",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Unauthorized");
    }
  };

  return (
    <section>
      <Card
        className="w-fit max-h-[700px] overflow-y-auto"
        data-aos="fade-right"
      >
        <CardHeader>
          <CardTitle>Capsulas</CardTitle>
          <CardDescription>Suas Capsulas</CardDescription>
          <CardAction />
        </CardHeader>
        <CardContent>
          <table className="table-auto w-full border-collapse ">
            <thead>
              <tr className="text-left">
                <th className="border px-4 py-2 select-none">id</th>
                <th className="border px-4 py-2 select-none">userId</th>
                <th className="border px-4 py-2 select-none">dataEnvio</th>
                <th className="border px-4 py-2 select-none">status</th>
                <th className="border px-4 py-2 select-none">email destinatario</th>
                <th className="border px-4 py-2 select-none">content</th>
                <th className="border px-4 py-2 select-none">Editar</th>
                <th className="border px-4 py-2 select-none">Deletar</th>
                <th className="border px-4 py-2 select-none">Cancelar envio</th>
              </tr>
            </thead>
            <tbody>
              {capsuleData?.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2 select-none">{item._id}</td>
                  <td className="border px-4 py-2 select-none">{item.userId}</td>
                  <td className="border px-4 py-2 select-none">{item.dataEnvio}</td>
                  <td className="border px-4 py-2 select-none">{item.status}</td>
                  <td className="border px-4 py-2 select-none">{item.emailDestinatario}</td>
                  <td className="border px-4 py-2 min-w-[300px] max-w[500px] break-words select-none">
                    {item.content}
                  </td>
                  <td className="border px-4 py-2">
                    <Edit className="text-blue-500" />
                  </td>
                  <td className="border px-4 py-2">
                    <Trash2
                      className="text-red-500"
                      onClick={() => apagarCapsula({ id: item._id })}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <StopCircle
                      className="text-green-500"
                      onClick={() => cancelarCapsula({ id: item._id })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/create" className="flex gap-3 border px-2 py-2 rounded-md bg-cyan-600">
            Add capsula
            <Plus />
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Capsulas;

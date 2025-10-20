'use client'
import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
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


export interface Capsula {
  _id: string;
  content: string;
  dataEnvio: string;
  status: string;
}

const Pendentes = () => {
  const [capsuleData, setCapsulesData] = useState<Capsula[]>([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const retornocapsulas = async () => {
      if (token) {
        // const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(
          `http://localhost:8000/api/capsulas/pendentes`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data)
        setCapsulesData(response.data);
      }
    };
    retornocapsulas();
  }, [token]);
  return (
    <section>
      <Card
        className="w-fit max-h-[700px] overflow-y-auto"
        data-aos="fade-right"
      >
        <CardHeader>
          <CardTitle>Capsulas Pendentes</CardTitle>
          <CardDescription>Suas Capsulas</CardDescription>
          <CardAction />
        </CardHeader>
        <CardContent>
          <table className="table-auto w-full border-collapse ">
            <thead>
              <tr className="text-left">
                <th className="border px-4 py-2 select-none">id</th>
                <th className="border px-4 py-2 select-none">dataEnvio</th>
                <th className="border px-4 py-2 select-none">status</th>
                <th className="border px-4 py-2 select-none">content</th>
              </tr>
            </thead>
            <tbody>
              {capsuleData.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2 select-none">{item._id}</td>
                  <td className="border px-4 py-2 select-none">
                    {item.dataEnvio}
                  </td>
                  <td className="border px-4 py-2 select-none">
                    {item.status}
                  </td>
                  <td className="border px-4 py-2 min-w-[300px] max-w[500px] break-words select-none">
                    {item.content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardFooter />
      </Card>
    </section>
  );
};

export default Pendentes;

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import image1 from "@/public/capsula.png";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";


const Hero = () => {
  
  return (
    <div className="container mx-auto mt-20 px-4">
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Texto */}
        <div className="flex-1 flex flex-col">
          <h1
            className="text-[44px] lg:text-[84px] md:text-[64px] leading-[1.2] font-semibold select-none"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            Messages beyond time,sent exactly when you choose <br />
          </h1>
          <Input
            placeholder="Enter email"
            type="email"
            className="w-[400px] h-[50px] mt-4"
          />
          <Button className="mt-4 w-[200px] h-[55px] rounded-full text-[17px] cursor-pointer">
            Try Now
          </Button>
        </div>
        <Image
          src={image1}
          alt="Imagem do hero"
          priority
          quality={75}
          className="w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] object-contain rounded-md"
          data-aos="flip-down"
          data-aos-delay="600"
        />
      </section>
    </div>
  );
};

export default Hero;

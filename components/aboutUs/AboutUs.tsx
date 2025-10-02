import React from "react";
import swr from 'swr'

const AboutUs = () => {
  return (
    <section className="container mx-auto px-6 mt-60 bg-[url('/black.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl max-w-[1700px] h-[500px] mb-10" id="aboutUs">
      <div className="flex items-center justify-between gap-12 mb-20 bg-[#333]/50 p-10 rounded-xl">
        <div className="flex-1 flex-col">
          <h1 className= "flex items-start text-[44px] lg:text-[64px] leading-[1.1] font-semibold select-none" data-aos="fade-down" >
            ABOUT US
          </h1>

          <p
            className="mt-6 text-[23px] leading-12 max-w-[700px] items-start font-semibold"
            data-aos="fade-down-left"
          >
          Saved today to surprise tomorrow. TimeNest lets you create digital capsules — messages, photos, and locations — that are only delivered on the date you choose. Simple, secure, and full of meaning
          </p>
          <button className="mt-5 border-2 border-black/24 px-3 py-4 rounded-md bg-blue-500 text-white font-semibold pointer cursor-pointer ">Learn More</button>
        </div>
      
      </div>
    </section>
  );
};

export default AboutUs;

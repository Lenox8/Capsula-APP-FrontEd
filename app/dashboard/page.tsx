import AppSideBar from "@/components/appsidebar/AppSideBar";
import Capsulas from "@/components/capsulas/Capsulas";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 2xl:grid-cols-4">
        <Capsulas />
      
    </div>
  );
};

export default page;

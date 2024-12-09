import { Check } from "lucide-react";
import React from "react";
import CheckListItem from "./CheckListItem";

const WhatWeDo = () => {
  return (
    <div className="flex flex-col md:flex-row md:text-lg">
      <p className="md:w-2/3 p-4">
        We won’t take full control of your application because your application
        is a reflection of who you are. On top of that it is impossible for
        anyone else to be as passionate as you are for your own future. However,
        we are here to guide you through every challenge you may encounter while
        applying to your dream school.
      </p>
      <div className="md:w-1/3 md:pl-20">
        <div className="grid grid-cols-1 gap-y-3 justify-content-center">
          <CheckListItem text={"Schedule a consultation"} color={"#85B6FF"} />
          <CheckListItem text={"Pick a plan for you"} color={"#00FFC2"} />
          <CheckListItem
            text={"List out your dream schools"}
            color={"#0074FD"}
          />
          <CheckListItem text={"Let’s get to work!"} color={"#FFB0A5"} />
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;

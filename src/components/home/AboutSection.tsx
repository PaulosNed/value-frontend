import React from "react";
import CheckListItem from "./CheckListItem";
import CardItems from "./CardItems";
import UniveristiesList from "./UniveristiesList";

const AboutSection = () => {
  return (
    <div className="text-primary">
      <h1 className="font-bold text-xl md:text-3xl text-center">
        Powerful guidance for your
      </h1>
      <h1 className="font-bold text-xl md:text-3xl text-center">
        Academic Success
      </h1>

      <div className="mt-4 md:mt-20 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-1/2">
          <h3 className="md:text-2xl font-bold text-center md:text-start">
            Helping you focus on
          </h3>
          <h3 className="md:text-2xl font-bold text-center md:text-start">
            what really matters
          </h3>
          <p className="mt-6">
            There are 4 Essential aspects of any application. While all are
            equally important you can truly boost your application by
            highlighting your strengths, and we can guide you through that.
          </p>
        </div>
        <div className="w-full md:w-1/2 md:flex md:justify-end">
          <div className="px-2 md:px-10 grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6">
            <CheckListItem text={"Grade"} color={"#85B6FF"} />
            <CheckListItem text={"Achievements"} color={"#00FFC2"} />
            <CheckListItem text={"Essays"} color={"#0074FD"} />
            <CheckListItem text={"Finance"} color={"#FFB0A5"} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-0 md:flex-row mt-10 md:mt-40">
        <div className="w-full md:w-6/12">
          <CardItems />
        </div>
        <div className="w-full md:w-6/12">
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">
              It’s hard but it’s not impossible.
            </h1>
            <p>
              Applying to your dream University can be more than just a dream.
              We know you’re smart but big universities are looking for more
              than just grades. so what more do you offer? Everyone that applies
              is probably very smart, let’s help you differentiate yourself with
              your personality and unique skills.
            </p>
            <div className="px-2 grid grid-cols-2 justify-items-start gap-x-8 md:gap-x-12 gap-y-6">
              <CheckListItem text={"Art & Music"} color={"#85B6FF"} />
              <CheckListItem text={"Sports"} color={"#00FFC2"} />
              <CheckListItem text={"Unique Skills"} color={"#0074FD"} />
              <CheckListItem text={"History"} color={"#FFB0A5"} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutSection;

import React from "react";
import CheckListItem from "./CheckListItem";
import { Pro } from "./Pricing";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";

interface PriceItemProps {
  id: string;
  title: string;
  amount: string;
  pros: Pro[];
  index: number;
  desc?: string;
}

const PriceItem = ({ id, title, amount, pros, index, desc }: PriceItemProps) => {
  return (
    <Card className={`w-full md:w-1/3 px-10 flex flex-col items-center py-10 md:py-20 h-fit ${index == 2 ? "bg-primary text-white shadow-custom-blue-lg" : ""}`}>
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-3 text-2xl font-bold">{amount}</p>
      {desc && <p className="mt-5 bg-primary text-white rounded-full px-4 py-1 text-xs font-medium">{desc}</p>}
      <ul className="mt-10 flex flex-col gap-2">
        {pros.map((pro: Pro, index: number) => (
          <div className="py-2 w-full" key={index}>
            <CheckListItem color={pro.color} text={pro.text} />
          </div>
        ))}
      </ul>
      <Button variant={index == 2 ? "default" : "outline"} className={`mt-10 px-4 border border-primary ${index == 2 ? "border border-secondary hover:bg-opacity-75" : ""}`} asChild>
        <Link href="/apply">Choose plan</Link>
      </Button>
    </Card>
  );
};

export default PriceItem;

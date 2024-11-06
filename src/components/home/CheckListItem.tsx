import React from "react";
import TickIcon from "../layout/TickIcon";

interface CheckListItemProps {
  color: string;
  text: string;
}

const CheckListItem = ({ color, text }: CheckListItemProps) => {
  return (
    <div className="grid grid-cols-12 place-items-start">
      <div className="col-span-2 mt-2">
        <TickIcon color={color} />
      </div>
      <p className="col-span-10">{text}</p>
    </div>
  );
};

export default CheckListItem;

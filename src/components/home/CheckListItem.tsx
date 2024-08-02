import React from "react";
import TickIcon from "../layout/TickIcon";

interface CheckListItemProps {
    color: string;
  text: string;
}

const CheckListItem = ({ color, text }: CheckListItemProps) => {
  return (
    <div className="flex space-x-4 items-center">
      <TickIcon color={color} />
      <p>{text}</p>
    </div>
  );
};

export default CheckListItem;

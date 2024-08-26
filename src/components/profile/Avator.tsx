import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useSession } from "next-auth/react";
  
interface AvatarProps {
    imageSrc: string;
    fallbackText: string;
}

  export function AvatarDemo({ imageSrc, fallbackText }: AvatarProps) {

    return (
      <Avatar>
        <AvatarImage src={imageSrc} alt="Profile" />
        <AvatarFallback className="bg-primary text-white">{fallbackText}</AvatarFallback>
      </Avatar>
    )
  }
  
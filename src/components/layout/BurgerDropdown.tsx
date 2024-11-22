/* eslint-disable @next/next/no-img-element */
"use client";

import {
    LogIn,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { NavigationOptions } from "@/Models/NavigationOptions";
import { FaRegistered } from "react-icons/fa";

interface DropdownNavigationMenuProps {
  navOptions: NavigationOptions[];
  loggedIn: boolean;
}

export function DropdownNavigationMenu({
  navOptions,
  loggedIn,
}: DropdownNavigationMenuProps) {
  const router = useRouter();

  const logout = () => {
    signOut({ redirect: false })
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img src={"/images/burger.svg"} alt="" width={40} height={40} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-3">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navOptions.map((navOption) => (
            <DropdownMenuItem key={navOption.name}>
              <Link href={navOption.link} className="pr-2">
                {navOption.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {loggedIn && (
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        )}
        {!loggedIn && (
          <>
            <DropdownMenuItem>
              <LogIn className="mr-2 h-4 w-4" />
              <Link href='/login'>login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaRegistered className="mr-2 h-4 w-4" />
              <Link href='/#prices'>Signup</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

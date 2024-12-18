"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import NavLink from "./NavLink";
import { AvatarMenu } from "../profile/AvatarMenu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthedNavBar = () => {
  const authenticatedNavItems = [
    // {
    //   name: "Home",
    //   link: "/",
    // },
    {
      name: "Dashboard",
      link: "/user/dashboard",
    },
    {
      name: "Course",
      link: "/user/course",
    },
    {
      name: "Community",
      link: "/user/community",
    },
  ];

  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const router = useRouter();

  const logout = (e: any) => {
    signOut({ redirect: false })
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  };

  return (
    <NavigationMenu>
      <div
        className={`bg-white w-screen px-6 py-4 md:px-10 md:py-6 flex justify-between items-center z-20 border-b shadow-sm`}
      >
        {/* Logo section */}
        <Link href="/" passHref className="w-2/12">
          <div className="flex items-center justify-start">
            <img
              src="/images/layout/logo.svg"
              alt="Logo"
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="-ml-2 text-lg font-semibold text-primary">
              Value
            </span>
          </div>
        </Link>

        {/* authenticcated Navigation menu */}
        <NavigationMenuList>
          <div className="hidden md:flex">
            {authenticatedNavItems.map((item, index) => (
              <NavLink key={index} name={item.name} link={item.link} />
            ))}
          </div>
        </NavigationMenuList>

        {/* Profiel details for those who are authenticated */}
        <div className="hidden md:flex w-2/12 gap-5 justify-end items-center">
          <img
            src="/images/layout/notification.svg"
            alt="notification bell"
            className="w-6 h-6 object-cover"
          />
          <AvatarMenu />
        </div>

        {/* mobile burger */}
        {/* Mobile view */}
        <div className="block md:hidden">
          <div className="flex flex-col items-end relative">
            <div className="flex gap-2">
              <AvatarMenu />
              <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <img src={"/images/burger.svg"} alt="" width={40} height={40} />
              </button>
            </div>

            {/* Navigation section */}
            {isMenuToggled && (
              <div className="flex flex-col w-44 py-5 pl-8 space-y-2 absolute top-10 right-0 bg-secondary shadow-lg">
                {authenticatedNavItems.map((nav, idx) => (
                  <div key={nav.name} onClick={() => setIsMenuToggled(false)}>
                    <Link href={nav.link} className="text-primary">
                      {nav.name}
                    </Link>
                    </div>
                ))}
                <div className="h-1"></div>
                <hr className="-ml-6 mr-2" />
                <div className="h-1"></div>
                <div onClick={logout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default AuthedNavBar;

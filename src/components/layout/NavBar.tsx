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
import { useSession } from "next-auth/react";

const NavBar = () => {
  const navItems = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Universities",
      link: "#unis",
    },
    {
      name: "Workflow",
      link: "#workflow",
    },
    {
      name: "Prices",
      link: "#prices",
    },
  ];

  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

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

        <NavigationMenuList>
          <div className="hidden md:flex">
            {navItems.map((item, index) => (
              <NavLink key={index} name={item.name} link={item.link} />
            ))}
          </div>
        </NavigationMenuList>
        {/* authenticcated Navigation menu */}

        {/* Authentication buttons for non-authenticated */}
        <div className="hidden md:flex w-2/12 space-x-4 justify-end">
          <Button
            asChild
            className="px-6 border border-primary"
            variant="outline"
          >
            <Link href={"/login"}>Log in</Link>
          </Button>
          <Button asChild className="px-6">
            <Link href={"/#prices"}>Apply</Link>
          </Button>
        </div>

        {/* mobile burger */}
        {/* Mobile view */}
        <div className="block md:hidden">
          <div className="flex flex-col items-end relative">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <img src={"/images/burger.svg"} alt="" width={40} height={40} />
            </button>

            {/* Navigation section */}
            {isMenuToggled && (
              <div className="flex flex-col w-44 py-5 pl-8 space-y-2 absolute top-10 right-0 bg-secondary shadow-lg">
                {navItems.map((nav, idx) => (
                  <div key={nav.name} onClick={() => setIsMenuToggled(false)}>
                    <Link href={nav.link} className="text-primary">
                      {nav.name}
                    </Link>
                    {/* <NavLink name={nav.name} link={nav.link} /> */}
                  </div>
                ))}
                <div className="h-1"></div>
                <hr className="-ml-6 mr-2" />
                <div className="h-1"></div>
                <Link href={"/login"} className="text-primary" onClick={() => setIsMenuToggled(false)}>
                  Login
                </Link>
                <Link href={"/#prices"} className="text-primary" onClick={() => setIsMenuToggled(false)}>
                  Apply
                </Link>
                {/* <Button
                  asChild
                  className="-ml-5 mx-3 px-3 border border-primary"
                  variant="outline"
                >
                  <Link href={"/login"}>Log in</Link>
                </Button> */}
                {/* <button className="btn">Login</button>
              <button className="btn">Donate</button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default NavBar;

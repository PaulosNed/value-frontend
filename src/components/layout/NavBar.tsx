/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import NavLink from "./NavLink";

const NavBar = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Courses",
      link: "/courses",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Community",
      link: "/community",
    },
  ];
  return (
    <NavigationMenu>
      <div className="w-screen md:px-10 md:py-6 flex justify-between items-center z-20">
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

        {/* Navigation menu */}
        <NavigationMenuList>
          <div className="flex">
            {navItems.map((item, index) => (
              <NavLink key={index} name={item.name} link={item.link} />
            ))}
          </div>
        </NavigationMenuList>

        {/* Signup button */}
        <div className="w-2/12 flex space-x-4 justify-end">
          <Button
            asChild
            className="px-6 border border-primary"
            variant="outline"
          >
            <Link href={"/login"}>Log in</Link>
          </Button>
          <Button asChild className="px-6">
            <Link href={"/signup"}>Sign up</Link>
          </Button>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default NavBar;

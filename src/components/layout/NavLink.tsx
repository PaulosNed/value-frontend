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

interface NavLinkProps {
  link: string;
  name: string;
}

const NavLink = ({ link, name }: NavLinkProps) => {
  return (
    <NavigationMenuItem>
      <Link href={link} legacyBehavior passHref>
        <NavigationMenuLink
          className={`${navigationMenuTriggerStyle()} text-primary text-lg font-medium capitalize`}
        >
          {name}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default NavLink;

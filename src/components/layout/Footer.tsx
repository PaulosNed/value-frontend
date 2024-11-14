/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { footerBLogLinks, footerLinks, footerTeamLinks } from "../../Models/footerNav/footerNav";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <section className="flex justify-center flex-col items-center border-t-[2px] shadow-lg bg-primary text-white">
      <div className=" w-[90%] p-5 flex justify-around gap-8 flex-col md:flex-row  ">
        {/* for desktop */}
        <div className=" hidden md:flex bg-white rounded-lg w-[20%]  justify-center items-center ">
          <img
            width={450}
            height={200}
            src="/images/layout/undraw_educator_re_ju47.svg"
            alt="Value College Prep"
          />
        </div>

        {/* for text */}
        <div className="w-full md:w-[25%] font-bold my:8 md:my-0  py-3 hidden md:flex gap-y-3 justify-center items-center flex-col ">
          <p className=" m-1 font-montserrat">Join Our Community Today</p>

          <Button
            variant="outline"
            className="rounded-lg bg-primary font-montserrat text-white w-1/2 py-2 flex justify-center items-center"
            asChild
          >
            <Link href={"/login"}>Sign in</Link>
          </Button>
        </div>

        {/* for links */}
        <section className="  w-full md:w-[55%] flex  justify-between md:justify-around  items-start  flex-wrap flex-row  py-5 md:py-2 gap-y-10">
          {/* Links */}
          <div className=" flex justify-center flex-col font-light gap-y-3">
            <p className="font-semibold ">Links</p>
            {footerLinks.map((link: any) => (
              <Link key={link.linkName} href={link.linkPath}>
                {link.linkName}
              </Link>
            ))}
          </div>

          {/* Teams */}
          <div className=" flex justify-center flex-col font-light gap-y-3">
            <p className="font-semibold">Teams</p>
            {footerBLogLinks.map((link: any) => (
              <Link key={link.linkName} href={link.linkPath}>
                {link.linkName}
              </Link>
            ))}
          </div>

          {/* Blogs */}
          <div className=" flex justify-center flex-col font-light gap-y-3">
            <p className=" font-semibold">Blogs</p>
            {footerTeamLinks.map((link: any) => (
              <Link key={link.linkName} href={link.linkPath}>
                {link.linkName}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* copyright */}
      <div className="w-[98%] md:border-t-2 md:py-2 mx-auto flex mt-5 flex-col md:flex-row justify-between gap-y-5">
        <div className="flex justify-start">
          <p className="text-sm md:text-base ml-5">
            © 2024 Value College Prep, Inc. All right reserved.
          </p>{" "}
        </div>

        <p className="flex justify-center md:justify-end gap-x-8   ">
          <img
            width={25}
            height={25}
            alt="twitter img"
            src={"/images/social-icons/twitter.png"}
          />
          <img
            width={25}
            height={25}
            alt="facebook img"
            src={"/images/social-icons/facebook.png"}
          />
          <img
            width={25}
            height={25}
            alt="linkedin img"
            src={"/images/social-icons/linkedin.png"}
          />
          <img
            width={25}
            height={25}
            alt="instagram img"
            src={"/images/social-icons/instagram.png"}
          />
        </p>
      </div>
    </section>
  );
};

export default Footer;

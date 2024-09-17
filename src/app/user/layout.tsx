import AuthedNavBar from "@/components/layout/AuthedNavBar";
import React from "react";

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="relative">
      
      {/* Nav section */}
      <div className="fixed inset-0 z-40 h-20 md:h-24">
        <AuthedNavBar />
      </div>

      {/* Body */}
      <div className="mt-32 md:mt-40">{children}</div>
    </div>
  );
};

export default Layout;

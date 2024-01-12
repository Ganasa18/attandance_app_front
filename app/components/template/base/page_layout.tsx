/* eslint-disable import/no-unresolved */
import React from "react";
import LayoutSidebar from "../sidebar/layout_sidebar";
import LayoutTopbar from "../topbar/topbar";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* SIDEBAR */}
      <LayoutSidebar />
      <div className="w-full flex flex-col overflow-x-hidden">
        {/* TOPBAR */}
        <LayoutTopbar />
        {/* MAIN PAGE */}
        <div className="h-full bg-slate-100 p-4 flex-col">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;

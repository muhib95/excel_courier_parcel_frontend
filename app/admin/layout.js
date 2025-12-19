import ResponsiveHeader from "@/components/Header/ResponsiveHeader";
import React from "react";

const AdminLayout = ({ children }) => {
  const typeHeader = 'Admin';
   const menu = [
    {
      label: "Home",
      link: "/admin",
    },
    {
      label: "Users",
      link: "/admin/userlist",
    },
    {
      label: "Parcels",
      link: "/admin/booking",
    },
    {
      label: "Reports",
      link: "/admin/report",
    },
  ];
  return (
    <div className="">
      <div>
        <ResponsiveHeader typeHeader={typeHeader} menu={menu}/>
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;

import { Outlet } from "react-router-dom";
import sections from "../../sections";
import common from "../../common";
import { useState } from "react";




const LayoutUser = () => {
  var [loading,setLoading]= useState(false)
  return (
    <>
      {
        loading ? 
        common.load :  // Render as JSX
        <div>
          {sections.user.header }  {/* Render as JSX */}
          <div>
            <Outlet />  {/* This will render the child routes */}
          </div>
          {sections.user.footer }  {/* Render as JSX */}
        </div>
      }
    </>
  );
};
export default LayoutUser;
import React, { useEffect } from "react";
import MenuBar from "../sidebar/MenuBar";
import { useNavigate } from "react-router-dom";

const Topnav = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        console.error("UID not found in local storage");
        // props.history.replace("/auth/login");
        navigate("/auth/login")
        window.location.reload();
      }
    };

    getUserData();
  }, [props.history]);

  return (
    <div style={{ position: "absolute", left: 20, top: '27px' }}>
      <MenuBar />
    </div>
  );
};

export default Topnav;

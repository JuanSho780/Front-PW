import { Outlet } from "react-router-dom";
import Header from "../components/Header/header.jsx";

const RootWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootWrapper;

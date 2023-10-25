import React from "react";
import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";

const Header = () => {
  return (
    <header className="w-full flex justify-between px-8 py-4 border border-solid ">
      <div>
        <Logo />
      </div>
      <div className="flex gap-8 items-center">
        <h3>Samuel</h3>
        <Button
          buttonText="Logout"
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            console.log("click");
          }}
        />
      </div>
    </header>
  );
};

export default Header;

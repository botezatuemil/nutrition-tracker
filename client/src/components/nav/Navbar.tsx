import React, { useEffect, useState } from "react";
import { getName } from "../../actions/userAction";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Navbar: React.FC<{ title: string }> = (props) => {
  const dispatch = useAppDispatch();

  const name = useAppSelector((state) => state.username);
  const fetchUserName = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    dispatch(getName(headers));
  };

  useEffect(() => {
    if (name.length === 0)
      fetchUserName();
  }, []);

  return (
    <div className="w-full flex flex-row min-h-[8vh] justify-content items-center space-between px-[4vw] bg-white justify-between border-b-2">
      <p className="text-[#535353] text-md font-semibold font-jakarta">
        {props.title}
      </p>
      <p className="text-[#535353] font-semibold font-jakarta">{name}</p>
    </div>
  );
};

export default Navbar;

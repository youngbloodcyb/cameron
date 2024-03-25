"use client";

import { FC, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

const BackButton: FC = () => {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <button className="w-fit h-fit flex" onClick={handleClick}>
      <span className="border-b text-sm mb-6">Go back</span>
    </button>
  );
};

export default BackButton;

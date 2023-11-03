import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="font-bold text-3xl bg-gradient-to-r from-indigo-500 to-green-500 text-transparent bg-clip-text hover:cursor-pointer"
    >
      LOGO
    </Link>
  );
}

export default Logo;

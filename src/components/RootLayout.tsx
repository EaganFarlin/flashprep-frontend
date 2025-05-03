import { useState } from "react";
import { Outlet, Link } from "react-router";

export default function RootLayout() {
  return (
    <div className="w-screen min-h-screen px-[10%] pb-[5%] bg-gray-950 text-white">
      <header className="bg-gray-950 sticky top-[0px] py-4 flex items-center mb-8">
        <Link to="/dashboard">
          <h1 className="text-3xl">⚡FlashPrep</h1>
        </Link>
        <Link
          to="/create"
          className="flex justify-center items-center rounded-full w-12 h-12 bg-amber-500 ml-auto text-3xl"
        >
          +
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

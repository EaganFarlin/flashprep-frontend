import { useState } from "react";
import { Outlet, Link } from "react-router";

export default function RootLayout() {
  return (
    <div className="fixed w-screen min-h-screen py-4 px-[10%] bg-gray-950 text-white">
      <header className="flex items-center mb-8">
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

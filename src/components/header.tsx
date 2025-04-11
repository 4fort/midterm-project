import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center border border-border rounded-xl p-6">
      <h1 className="text-2xl font-bold">Visualizing Country Information</h1>
      {/* <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-blue-300">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-300">
              About
            </a>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}

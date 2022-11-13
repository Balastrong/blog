import React from "react";
export const Header = () => {
  return (
    <header className="Header">
      <div className="Header_left">
        <div className="Header_logo">
          <a href="/">[Logo]</a>
        </div>
        <ul>
          <li>Home</li>
          <li>YouTube</li>
          <li>About</li>
        </ul>
      </div>
      <div className="Header_right">[Links]</div>
    </header>
  );
};

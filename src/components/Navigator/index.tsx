import { NavigatorButton } from "components/NavigatorButton";
import React from "react";
import "./Navigator.scss";

export function Navigator({
  leftButton,
  rightButton,
  centerText,
}: {
  leftButton?: {
    text: string;
    link: string;
  };
  rightButton?: {
    text: string;
    link: string;
  };
  centerText?: string | React.ReactNode;
}) {
  return (
    <nav className="Navigator">
      <ul className="Navigator_list">
        <li className="Navigator_item Navigator_item___left">
          {leftButton && <NavigatorButton {...leftButton} arrow="left" />}
        </li>
        {centerText && (
          <li className="Navigator_item Navigator_item___center">
            {centerText}
          </li>
        )}
        <li className="Navigator_item Navigator_item___right">
          {rightButton && <NavigatorButton {...rightButton} arrow="right" />}
        </li>
      </ul>
    </nav>
  );
}

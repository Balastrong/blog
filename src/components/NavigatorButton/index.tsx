import classNames from "classnames";
import { Card } from "components";
import { Link } from "gatsby";
import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./NavigatorButton.scss";

export function NavigatorButton({
  link,
  text,
  arrow,
}: {
  link: string;
  text: string;
  arrow: "left" | "right";
}) {
  return (
    <div className="NavigatorButton">
      <Card>
        <div
          className={classNames("NavigatorButton_content", {
            NavigatorButton_content___right: arrow === "right",
          })}
        >
          <Link to={link} className="NavigatorButton_arrow">
            {arrow === "left" ? (
              <FaArrowAltCircleLeft />
            ) : (
              <FaArrowAltCircleRight />
            )}
          </Link>
          <div className="NavigatorButton_text">
            <Link to={link}>{text}</Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

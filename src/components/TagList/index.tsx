import React from "react";
import { Tag } from "../Tag";
import "./TagList.scss";

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="TagList">
      {tags.map((tag, i) => (
        <li key={tag} className="TagList_item">
          <Tag tag={tag} />
          {i < tags.length - 1 && <span>,</span>}
        </li>
      ))}
    </ul>
  );
}

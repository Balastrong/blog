import { Navigator } from "components";
import React from "react";
import { PaginatedIndexContext } from "types/gatsby";
import "./Paginator.scss";

export function Paginator({
  context: { currentPage, numPages, limit, skip },
}: {
  context: PaginatedIndexContext;
}) {
  const currentPageDisplay = currentPage + 1;

  return (
    <Navigator
      leftButton={
        currentPageDisplay > 1
          ? {
              link:
                currentPageDisplay === 2 ? "/" : `/${currentPageDisplay - 1}`,
              text: "Newer Posts",
            }
          : undefined
      }
      rightButton={
        currentPageDisplay < numPages
          ? {
              link: `/page/${currentPageDisplay + 1}`,
              text: "Older Posts",
            }
          : undefined
      }
      centerText={
        <>
          Page {currentPageDisplay} of {numPages}
        </>
      }
    />
  );
}

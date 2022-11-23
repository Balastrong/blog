import { Link } from "gatsby";
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
    <div className="Paginator">
      <div className="Paginator_left">
        {currentPageDisplay > 1 && (
          <Link
            to={
              currentPageDisplay === 2 ? "/" : `/page/${currentPageDisplay - 1}`
            }
          >
            ← Previous posts
          </Link>
        )}
      </div>
      <div className="Paginator_currentPage">
        Page {currentPageDisplay} of {numPages}
      </div>
      <div className="Paginator_right">
        {currentPageDisplay < numPages && (
          <Link to={`/page/${currentPageDisplay + 1}`}>Next posts →</Link>
        )}
      </div>
    </div>
  );
}

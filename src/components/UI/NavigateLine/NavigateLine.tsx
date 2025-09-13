import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./index.module.css";

const NavigateLine: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const rawSegments = pathname.split("/").filter(Boolean);

  const isIdSegment = (seg: string) => {
    const numeric = /^\d+$/.test(seg);
    const uuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        seg
      );
    return numeric || uuid;
  };

  const segments = rawSegments.filter((seg) => !isIdSegment(seg));

  const makeLabel = (seg: string) =>
    decodeURIComponent(seg)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className={`flex gap ${s.navigate}`}>
      <Link to="/">Home</Link>

      {segments.map((seg, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const label = makeLabel(seg);
        const isCurrent = i === segments.length - 1;

        return (
          <React.Fragment key={path}>
            <span>/</span>
            {isCurrent ? (
              <span aria-current="page">{label}</span>
            ) : (
              <Link to={path}>{label}</Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NavigateLine;

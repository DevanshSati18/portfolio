import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHead({
  idx,
  label,
  title,
  children,
}: {
  idx: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal className="sh">
      <span className="kicker">
        <span className="idx">{idx}</span> {label}
      </span>
      <div className="sh-body">
        <h2 className="h2">{title}</h2>
        {children && <p className="lead">{children}</p>}
      </div>
    </Reveal>
  );
}

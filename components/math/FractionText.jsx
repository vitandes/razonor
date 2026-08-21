"use client";

import { Fragment } from "react";

const FRACTION_PATTERN = /(\?|-?\d+)\/(-?\d+)/g;

export function StackedFraction({ numerator, denominator, className = "" }) {
  return (
    <span
      className={`mx-[0.08em] inline-grid min-w-[1.25em] translate-y-[0.08em] grid-cols-1 place-items-stretch align-middle text-[0.82em] font-bold leading-none ${className}`}
      role="img"
      aria-label={`${numerator} sobre ${denominator}`}
    >
      <span className="border-b-[0.09em] border-current px-[0.15em] pb-[0.08em] text-center">{numerator}</span>
      <span className="px-[0.15em] pt-[0.08em] text-center">{denominator}</span>
    </span>
  );
}

export default function FractionText({ children }) {
  if (typeof children !== "string") return children;

  const pieces = [];
  let lastIndex = 0;

  for (const match of children.matchAll(FRACTION_PATTERN)) {
    if (match.index > lastIndex) pieces.push(children.slice(lastIndex, match.index));
    pieces.push(
      <StackedFraction
        key={`${match.index}-${match[0]}`}
        numerator={match[1]}
        denominator={match[2]}
      />,
    );
    lastIndex = match.index + match[0].length;
  }

  if (!pieces.length) return children;
  if (lastIndex < children.length) pieces.push(children.slice(lastIndex));

  return pieces.map((piece, index) => <Fragment key={index}>{piece}</Fragment>);
}

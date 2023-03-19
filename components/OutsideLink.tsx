import React from "react";

const OutsideLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default OutsideLink;

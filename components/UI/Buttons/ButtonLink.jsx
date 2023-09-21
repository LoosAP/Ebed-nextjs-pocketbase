import React from "react";

const ButtonLink = (props) => {
  const { className, children, href, ...rest } = props;
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default ButtonLink;

import React, { HTMLProps } from "react";
import styles from "./ApplicationHeader.module.scss";
import cn from "classnames";

const ApplicationHeader: React.FC<HTMLProps<HTMLHeadingElement>> = (props) => (
  <h1 {...props} className={cn(props.className, styles.header)}>
    {props.children}
  </h1>
);

export default ApplicationHeader;

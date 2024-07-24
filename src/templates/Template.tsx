import React from "react";

export interface TemplateProps {
  pageName: string; // page 이름
}

const Template = ({ pageName }: TemplateProps) => {
  return <div className={`${pageName}`}>hihi</div>;
};

export default Template;

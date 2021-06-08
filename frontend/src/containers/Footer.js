import React from "react";
import { CFooter } from "@coreui/react";
const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">
          &copy; {new Date().getFullYear()} Los Perros S.A.
        </span>
      </div>
    </CFooter>
  );
};

export default Footer;

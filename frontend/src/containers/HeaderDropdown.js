import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const HeaderDropdown = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "auth/logOut" });
    window.location.reload();
  };
  // const handleSettings = () => {
  //   history.push("/settings");
  // };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <div
            style={{
              backgroundColor: "#382052",
              color: "white",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user && user.nombre.charAt(0) + user.apellido.charAt(0)}
          </div>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Cerrar sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default HeaderDropdown;

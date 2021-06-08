import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CNavLink,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import navigation from "./_nav";
const Sidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => {
    return state.sidebarShow;
  });

  return (
    <CSidebar
      show={show}
      minimize={true}
      onShowChange={(val) => {
        return dispatch({ type: "set", sidebarShow: val });
      }}
    >
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
            CNavLink,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default Sidebar;

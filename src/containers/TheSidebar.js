import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

// sidebar nav config
import mainNavigation from "./_nav";

console.log(mainNavigation);

const TheSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.theme);
  const currentModule = localStorage.getItem("currentModule");
  const [module, setModule] = useState(currentModule);
  const [navigation, setNavigation] = useState({});

  const [navigationList, setNavigationList] = useState([]);

  const getNavigation = () => {
    switch (currentModule) {
      case "Settings":
        return setNavigationList(navigation.settings);
      case "Human Ressources":
        return setNavigationList(navigation.human_ressources);
      case "Store Management":
        window.open("http://192.168.3.7:8081/ ", "_blank");
      //return setNavigationList(navigation.administration)
      //return setNavigationList(navigation.store_management)
      case "Administration":
        return setNavigationList(navigation.administration);
      case "Finance and Accounts wing":
        //return setNavigationList(navigation.finance)
        window.open("http://192.168.3.7:8081/af/", "_blank");
      case "Planning and Development":
        return setNavigationList(navigation.planing);
      case "Technical":
        return setNavigationList(navigation.technical);
      case "Operating & Maintenance":
        return setNavigationList(navigation.operation);

      default:
        return false;
    }
  };

  useEffect(() => {
    mainNavigation.then((res) => {
      console.log(res);
      setNavigation(res._nav);
    });
  }, [mainNavigation]);

  useEffect(() => {
    setModule(module);
    getNavigation();
  }, [module, navigation]);

  console.log(navigationList);

  return (
    <CSidebar
      show={sidebarShow}
      unfoldable
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/modules">
        <h3>BBA-{module}</h3>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigationList}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />

        <CSidebarNavDivider />
        {/* <CSidebarNavTitle>System Utilization</CSidebarNavTitle>
        <CNavItem className="px-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>CPU Usage</b></small></div>
          <CProgress size="xs" value={25} color="info" />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CNavItem>
        <CNavItem className="px-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>Memory Usage</b></small></div>
          <CProgress size="xs" value={70} color="warning" />
          <small className="text-muted">11444GB/16384MB</small>
        </CNavItem>
        <CNavItem className="px-3 mb-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>SSD 1 Usage</b></small></div>
          <CProgress size="xs" value={95} color="danger" />
          <small className="text-muted">243GB/256GB</small>
        </CNavItem> */}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);

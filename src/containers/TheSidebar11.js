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
import navigation from "./_nav";
import { fetchProgramPermissions } from "src/actions/role";

//
import apiClient from "src/services/api";
import { program } from "@babel/types";

const TheSidebar11 = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.theme);
  const currentModule = localStorage.getItem("currentModule");
  const [module, setModule] = useState(currentModule);
  const [navigationList, setNavigationList] = useState([]);
  let { roles, roleModules, programsPermission } = useSelector(
    (state) => state.roles
  );
  const currentRoleID = localStorage.getItem("roleID");
  useEffect(() => {}, []);
  const [prg_id, setPrg_id] = useState([]);

  const getRoleHasPermissionHandler = () => {
    // formData.append("ModuleID", currentRoleID);
    // formData.append("ProgramID", e.target.value);
    // formData.append("RoleID", current_role_id);
    //dispatch(fetchProgramPermissions(currentRoleID, 1))
    // dispatch(grantProgramPermission(currentRoleID, 1));
  };
  //setPrg_id(dispatch(fetchProgramPermissions(currentRoleID, 1)))
  const checkPermissionExisthandler = (navsettings) => {
    //console.log(navsettings)
    //console.log(prg_id)
    //if (prg_id[0] === 1) {
    //console.log(currentRoleID)
    //lsetPrg_id(dispatch(fetchProgramPermissions(currentRoleID)))
    //console.log(prg_id, 'prg id')
    //;
    //console.log(fetchProgramPermissions(2, null))
    // const pp = []
    // pp.push(fetchProgramPermissions(2, ''))
    //let pp = roleid
    //console.log(roleid)
    //if (roleid[0][1] == 1) {

    /**const fetchPrograms = (roleID) => {
      ////
      //fetchGetRequest()
       apiClient
        .get('/role/program', {
          params: { userID: 1, RoleID: 21 },
        })
        .then((res) => {
          const { Program } = res.data
          //console.log(Program, 'program')
          console.log(Program)
          //return Program
          loop1: for (let index1 = 0; index1 < { program }?.length; index1++) {
            let element = program[index1]
            console.log(element)
            loop2: for (let index2 = 0; index2 < navsettings?.length; index2++) {
              if (navsettings[index2]._children) {
                let ns = navsettings[index2]
                loop3: for (
                  let index3 = 0;
                  index3 < ns._children?.length;
                  index3++
                ) {
                  if (ns._children[index3].name) {
                    let index = ns._children.indexOf(
                      (x) => x.name === element.Program,
                    )
                    if (index === -1) {
                      ns._children.splice(index, 1)
                      break loop2
                    }
                  }
                }
              }
            }
          }
        })*/
    //.then(fetchPrograms(2))
    //   .catch((err) => {
    //   console.error(err)
    // })
    //}

    /*  loop1: for (let index1 = 0; index1 < pp?.length; index1++) {
      let element = pp[index1]
      console.log(element)
      loop2: for (let index2 = 0; index2 < navsettings?.length; index2++) {
        if (navsettings[index2]._children) {
          let ns = navsettings[index2]
          loop3: for (let index3 = 0; index3 < ns._children?.length; index3++) {
            if (ns._children[index3].name) {
              let index = ns._children.indexOf(
                (x) => x.name === element.Program,
              )
              if (index === -1) {
                ns._children.splice(index, 1)
                break loop2
              }
            }
          }
        }
      }
    }*/

    // apiClient
    //   .get('/role/program', {
    //     params: { userID: 1, RoleID: 2 },
    //   })
    //   .then((res) => {
    //     const { Program } = res.data
    //     //console.log(Program, 'program')
    //     console.log(Program)
    //     return Program
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })

    return navsettings;
    // }
  };

  const getNavigation = () => {
    // if (programsPermission && programsPermission?.length > 0) {
    let permissions;
    switch (currentModule) {
      case "Settings":
        //permissions = checkPermissionExisthandler( programsPermission.filter((x) => x.ModuleID === 1),
        permissions = checkPermissionExisthandler(navigation.settings);
        return setNavigationList(permissions);
      case "Human Ressources":
      //permissions = checkPermissionExisthandler(programsPermission.filter(x => x.ModuleID === 3), navigation.settings, 3)
      // return setNavigationList(permissions);
      case "Store Management":
        window.open("http://192.168.3.7:8081/ ", "_blank");
        return;
      case "Administration":
        permissions = checkPermissionExisthandler(
          programsPermission.filter((x) => x.ModuleID === 2),
          navigation.settings,
          2
        );
        return setNavigationList(permissions);
      case "Finance and Accounts wing":
        window.open("http://192.168.3.7:8081/af/", "_blank");
        return;
      case "Planning and Development":
        return setNavigationList(navigation.planing);
      case "Technical":
        return setNavigationList(navigation.technical);
      case "Operating & Maintenance":
        return setNavigationList(navigation.operation);
      case "Accounts":
        permissions = checkPermissionExisthandler(
          programsPermission.filter((x) => x.ModuleID === 2),
          navigation.settings,
          2
        );
        return setNavigationList(permissions);
      default:
        return false;
    }
    // }
  };
  useEffect(() => {
    setModule(module);
    getRoleHasPermissionHandler();
    getNavigation();
  }, [module]);
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

export default React.memo(TheSidebar11);

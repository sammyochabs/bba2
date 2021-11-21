import React from "react";
import CIcon from "@coreui/icons-react";
import { Lock, Users } from "react-feather";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";

const MyFunction = async () => {
  // alert("rrrr"); // window.open('https://www.facebook.com/ ', '_blank')
  let res = await getUserProgramsPermisions(
    localStorage.getItem("userID"),
    localStorage.getItem("roleid")
  );

  console.log(res, "from nav");

  let programs = {};

  res?.forEach((program) => {
    if (program.ProgramID === 1) {
      programs.dashboardAdmin = program;
    }
    if (program.ProgramID === 2) {
      programs.loanType = program;
    }
    if (program.ProgramID === 3) {
      programs.grades = program;
    }
    if (program.ProgramID === 4) {
      programs.leavesTypes = program;
    }
    if (program.ProgramID === 5) {
      programs.loanFunds = program;
    }
    if (program.ProgramID === 6) {
      programs.districts = program;
    }
    if (program.ProgramID === 7) {
      programs.designations = program;
    }
    if (program.ProgramID === 8) {
      programs.departments = program;
    }
    if (program.ProgramID === 9) {
      programs.punishments = program;
    }
    if (program.ProgramID === 10) {
      programs.acrClass = program;
    }
    if (program.ProgramID === 11) {
      programs.acrTypes = program;
    }
    if (program.ProgramID === 12) {
      programs.healthInfo = program;
    }
    if (program.ProgramID === 13) {
      programs.documentTypes = program;
    }
    if (program.ProgramID === 14) {
      programs.roles = program;
    }
    if (program.ProgramID === 15) {
      programs.users = program;
    }
    if (program.ProgramID === 16) {
      programs.events = program;
    }
    if (program.ProgramID === 17) {
      programs.DashboardAdmin = program;
    }
    if (program.ProgramID === 18) {
      programs.dashboardEmployee = program;
    }
    if (program.ProgramID === 19) {
      programs.allEmployee = program;
    }
    if (program.ProgramID === 20) {
      programs.education = program;
    }
    if (program.ProgramID === 21) {
      programs.promotion = program;
    }
    if (program.ProgramID === 22) {
      programs.training = program;
    }
    if (program.ProgramID === 23) {
      programs.loanManagement = program;
    }
    if (program.ProgramID === 24) {
      programs.leaveManagement = program;
    }
    if (program.ProgramID === 25) {
      programs.healthManagement = program;
    }
    if (program.ProgramID === 26) {
      programs.disciplineManagement = program;
    }
    if (program.ProgramID === 27) {
      programs.storeManagement = program;
    }
    if (program.ProgramID === 28) {
      programs.loanManagementEmployee = program;
    }
    if (program.ProgramID === 29) {
      programs.leaveManagementEmployee = program;
    }
  });

  console.log(programs);

  const _nav = {
    settings: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard Admin",
        to:
          res?.length > 0 && programs.dashboardAdmin?.Permission === 1
            ? "/dashboard"
            : "/no-permission",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },

      {
        _tag: "CSidebarNavTitle",
        _children: ["Settings"],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Human ressources",
        route: "/settings ",
        icon: <Users className="mr-3" size="20" />,
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Loan Type",
            programid: "1",
            to:
              res?.length > 0 && programs.loanType?.Permission === 1
                ? "/settings/loantype"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Grades",
            to:
              res?.length > 0 && programs.grades?.Permission === 1
                ? "/settings/Grades"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Leave types & duration",
            to:
              res?.length > 0 && programs.leavesTypes?.Permission === 1
                ? "/settings/leaves"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Loan Funds",
            to:
              res?.length > 0 && programs.loanFunds?.Permission === 1
                ? "/settings/loanfunds"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Districts",
            to:
              res?.length > 0 && programs.districts?.Permission === 1
                ? "/settings/district"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Designations",
            to: "/settings/designation",
            to:
              res?.length > 0 && programs.designations?.Permission === 1
                ? "/settings/designation"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Departments",
            to:
              res?.length > 0 && programs.departments?.Permission === 1
                ? "/settings/department"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Punishment",
            to: "/settings/punishment",
            to:
              res?.length > 0 && programs.punishments?.Permission === 1
                ? "/settings/punishment"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "ACRClass",
            to:
              res?.length > 0 && programs.acrClass?.Permission === 1
                ? "/settings/acrclass"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "ACRType",
            to: "/settings/acrtype",
            to:
              res?.length > 0 && programs.acrTypes?.Permission === 1
                ? "/settings/acrtype"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Health Infos",
            to: "/settings/health_info",
            to:
              res?.length > 0 && programs.healthInfo?.Permission === 1
                ? "/settings/health_info"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Document type",
            to:
              res?.length > 0 && programs.documentTypes?.Permission === 1
                ? "/settings/document_type"
                : "/no-permission",
          },
          /*{
            _tag: 'CSidebarNavItem',
            name: 'Overtime',
            to: '/settings/overtime',
          },*/
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Users permission",
        icon: <Lock className="mr-3" size="20" />,
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Users",

            to:
              res?.length > 0 && programs.users?.Permission === 1
                ? "/settings/users"
                : "/no-permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Roles",
            to: "/settings/role",
            to:
              res?.length > 0 && programs.roles?.Permission === 1
                ? "/settings/role"
                : "/no-permission",
          },
        ],
      },
      {
        _tag: "CSidebarNavDivider",
      },
    ],
    human_ressources: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard Employee",
        to: "/dashboardEmployee",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavTitle",
        _children: ["Human ressources"],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Employees",
        route: "/base",
        icon: "cil-puzzle",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "All Employees",
            to: "/HR/listEmployee",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Education",
            to: "/HR/listEducations",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Promotion/Change",
            to: "/HR/listPromotions",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Training",
            to: "/HR/listTraining",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Loan Managment",
        to: "/HR/Loanmanagement",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "Leave Managment",
        to: "/HR/Leavemanagement",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      /*{
        _tag: 'CSidebarNavItem',
        name: 'OverTime Management',
        to: '/HR/OverTimemanagement',
        icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
      },*/
      {
        _tag: "CSidebarNavItem",
        name: "Health Managment",
        to: "/HR/HealthManagement",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "Discipline Managment",
        to: "/HR/disciplinemanagement",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
    ],
    store_management: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },

      {
        _tag: "CSidebarNavDropdown",
        name: "Requisitions",
        route: "/store_management ",
        icon: <Users className="mr-3" size="20" />,
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Requisition",
            to: "/store_management/requisition",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Requisition Managment",
            to: "/store_management/new",
          },
          {
            _tag: "CSidebarNavItem",
            name: "All Requisition",
            to: "/store_management/punishment",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Warehouse",
        route: "/store_management ",
        icon: <Users className="mr-3" size="20" />,
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Pending requisition",
            to: "/store_management/requisition",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Needs for supply",
            to: "/store_management/new",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Supply Request  ",
            to: "/store_management/punishment",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Receipt of purchases",
            to: "/store_management/punishment",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Requisition Output",
            to: "/store_management/punishment",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Extra Output",
            to: "/store_management/punishment",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Stock Situation",
            to: "/store_management/punishment",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Stock Valuation ",
            to: "/store_management/punishment",
          },
        ],
      },
    ],
    administration: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",

        to:
          res && programs.dashboardAdmin?.Permission === 1
            ? "/dashboard"
            : "/no-permission",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard Employee",
        to:
          res && programs.dashboardEmployee?.Permission === 1
            ? "/dashboardEmployee"
            : "/no-permission",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Human ressources",
        route: "/base",
        icon: "cil-puzzle",
        _children: [
          {
            _tag: "CSidebarNavDropdown",
            name: "Employees",
            route: "/base",
            icon: "cil-puzzle",
            _children: [
              {
                _tag: "CSidebarNavItem",
                name: "All Employees",
                to:
                  res && programs.allEmployee?.Permission === 1
                    ? "/HR/listEmployee"
                    : "/no-permission",
              },
              {
                _tag: "CSidebarNavItem",
                name: "Education",
                to:
                  res && programs.education?.Permission === 1
                    ? "/HR/listEducations"
                    : "/no-permission",
              },
              {
                _tag: "CSidebarNavItem",
                name: "Promotion/Change",

                to:
                  res && programs.promotion?.Permission === 1
                    ? "/HR/listPromotions"
                    : "/no-permission",
              },
              {
                _tag: "CSidebarNavItem",
                name: "Training",
                to:
                  res && programs.training?.Permission === 1
                    ? "/HR/listTraining"
                    : "/no-permission",
              },
            ],
          },
          {
            _tag: "CSidebarNavItem",
            name: "Loan Management",
            to:
              res && programs.loanManagement?.Permission === 1
                ? "/HR/loanManagement"
                : "/no-permission",
            icon: (
              <CIcon
                name="cil-speedometer"
                customClasses="c-sidebar-nav-icon"
              />
            ),
          },
          {
            _tag: "CSidebarNavItem",
            name: "Leave Management",
            to:
              res && programs.leaveManagement?.Permission === 1
                ? "/HR/Leavemanagement"
                : "/no-permission",
            icon: (
              <CIcon
                name="cil-speedometer"
                customClasses="c-sidebar-nav-icon"
              />
            ),
          },
          /*{
            _tag: 'CSidebarNavItem',
            name: 'OverTime Management',
            to: '/HR/OverTimemanagement',
            icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
          },*/
          {
            _tag: "CSidebarNavItem",
            name: "Health Management",
            to:
              res && programs.healthManagement?.Permission === 1
                ? "/HR/HealthManagement"
                : "/no-permission",
            icon: (
              <CIcon
                name="cil-speedometer"
                customClasses="c-sidebar-nav-icon"
              />
            ),
          },
          {
            _tag: "CSidebarNavItem",
            name: "Discipline Management",
            to: "/HR/disciplinemanagement",
            to:
              res && programs.healthManagement?.Permission === 1
                ? "/HR/disciplinemanagement"
                : "/no-permission",
            icon: (
              <CIcon
                name="cil-speedometer"
                customClasses="c-sidebar-nav-icon"
              />
            ),
          },
        ],
      },

      {
        _tag: "CSidebarNavDropdown",
        name: "Store Management",
        to:
          res && programs.storeManagement?.Permission === 1
            ? "/base"
            : "/no-permission",
        icon: "cil-puzzle",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Store Management",
            to: "/test-out",
            //URL: 'www.google.com',
            //onclick: { MyFunction },
            icon: (
              <CIcon
                name="cil-speedometer"
                customClasses="c-sidebar-nav-icon"
              />
            ),
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Estate",
        to: "/estate",
        icon: "cil-puzzle",
        //_children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "IT",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Vehicle",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
    ],
    finance: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "CPF",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "FDR",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Accounts",
        to: "/account",
        icon: "cil-puzzle",
        //_children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Payroll",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
    ],
    planing: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Report",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Monitoring",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Safeguard",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
    ],
    technical: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Road",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Bridge",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "RTW Monitoring",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Design",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
    ],
    operation: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: (
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
        ),
      },

      {
        _tag: "CSidebarNavDropdown",
        name: "Bangabandhu Setu",
        to: "/base",
        icon: "cil-puzzle",
        _children: [],
      },
    ],
  };

  return {
    _nav,
    programs,
  };
};

export default MyFunction();

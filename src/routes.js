import React from "react";
import { Route } from "react-router";
// const CodeEditors = React.lazy(() => import('./views/editors/code-editors/CodeEditors'));
// const TextEditors = React.lazy(() => import('./views/editors/text-editors/TextEditors'));

// const Invoice = React.lazy(() => import('./views/apps/invoicing/Invoice'));

// const AdvancedForms = React.lazy(() => import('./views/forms/advanced-forms/AdvancedForms'));
// const BasicForms = React.lazy(() => import('./views/forms/basic-forms/BasicForms'));
// const ValidationForms = React.lazy(() => import('./views/forms/validation-forms/ValidationForms'));
// const GoogleMaps = React.lazy(() => import('./views/google-maps/GoogleMaps'));
// const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
// const Calendar = React.lazy(() => import('./views/plugins/calendar/Calendar'));
// const Draggable = React.lazy(() => import('./views/plugins/draggable/Draggable'));
// const Spinners = React.lazy(() => import('./views/plugins/spinners/Spinners'));
// const AdvancedTables = React.lazy(() => import('./views/tables/advanced-tables/AdvancedTables'));
// const Tables = React.lazy(() => import('./views/tables/tables/Tables'));
// //const LoadingButtons = React.lazy(() => import('./views/buttons/loading-buttons'));

// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
// const Cards = React.lazy(() => import('./views/base/cards/Cards'));
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));

// const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
// const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
// const Navs = React.lazy(() => import('./views/base/navs/Navs'));
// const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
// const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
// const Switches = React.lazy(() => import('./views/base/switches/Switches'));

// const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
// const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
// const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
// const Charts = React.lazy(() => import('./views/charts/Charts'));
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
// const Users = React.lazy(() => import('./views/users/Users'));
// const User = React.lazy(() => import('./views/users/User'));

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const DashboardEmployee = React.lazy(() =>
  import("./views/dashboard/EmployeeDashboard")
);

const NoPermission = React.lazy(() => import("./views/dashboard/NoPermission"));

// Settings components
const LoanTypes = React.lazy(() =>
  import("./views/modules/settings/human-ressources/loantypes/LoanTypes")
);
const LoanFunds = React.lazy(() =>
  import("./views/modules/settings/human-ressources/loanfunds/Loanfunds")
);
const Grades = React.lazy(() =>
  import("./views/modules/settings/human-ressources/grades_and_payScale/Grades")
);
const Leaves = React.lazy(() =>
  import("./views/modules/settings/human-ressources/leaves/Leaves")
);
const District = React.lazy(() =>
  import("./views/modules/settings/human-ressources/districts/District")
);
const Designation = React.lazy(() =>
  import("./views/modules/settings/human-ressources/designations/Designation")
);
const Department = React.lazy(() =>
  import("./views/modules/settings/human-ressources/departments/Department")
);
const Punishment = React.lazy(() =>
  import("./views/modules/settings/human-ressources/punishment/Punishment")
);
const AcrClass = React.lazy(() =>
  import("./views/modules/settings/human-ressources/acr_class/AcrClass")
);
const AcrType = React.lazy(() =>
  import("./views/modules/settings/human-ressources/acr_type/AcrType")
);
const HealthInfo = React.lazy(() =>
  import("./views/modules/settings/human-ressources/health_infos/HealthInfo")
);
const DocumentType = React.lazy(() =>
  import(
    "./views/modules/settings/human-ressources/document_types/DocumentType"
  )
);
/*const Overtime = React.lazy(() =>
  import('./views/modules/settings/human-ressources/overtime/Overtime'),
)*/
const Role = React.lazy(() =>
  import("./views/modules/settings/users_permission/roles/Role")
);
const Users = React.lazy(() =>
  import("./views/modules/settings/users_permission/users/Users")
);

// Human ressources components
const AddEmployee = React.lazy(() =>
  import("./views/modules/human_ressources/employees/AddEmployee")
);
const ViewEmployee = React.lazy(() =>
  import("./views/modules/human_ressources/employees/ViewEmployee")
);
/*
const AddEducation = React.lazy(() =>
  import('./views/modules/human_ressources/Education/educationModal'),
)
const AddPromotion = React.lazy(() =>
  import('./views/modules/human_ressources/promotion/promotionModal'),
)
const AddTraining = React.lazy(() =>
  import('./views/modules/human_ressources/training/TrainerModal'),
)*/

const ListEmployee = React.lazy(() =>
  import("./views/modules/human_ressources/employees/ListEmployee")
);
const ListEducations = React.lazy(() =>
  import("./views/modules/human_ressources/Education/Education")
);
const ListTraining = React.lazy(() =>
  import("./views/modules/human_ressources/training/trainer")
);
const ListPromotions = React.lazy(() =>
  import("./views/modules/human_ressources/promotion/promotion")
);
const HealthManagement = React.lazy(() =>
  import("./views/modules/human_ressources/healthmanagement/HealthManagement")
);
const DisciplineManagement = React.lazy(() =>
  import(
    "./views/modules/human_ressources/disciplinemanagement/DisciplineManagement"
  )
);
const Loanmanagement = React.lazy(() =>
  import("./views/modules/human_ressources/emploan/EmpLoan")
);
const Leavemanagement = React.lazy(() =>
  import("./views/modules/human_ressources/empleave/EmpLeave")
);
/*const OverTimemanagement = React.lazy(() =>
  import('./views/modules/human_ressources/empovertime/EmpOvertime'),
)*/
const Profile = React.lazy(() => import("./views/Profile/profile"));
const AllNotifications = React.lazy(() =>
  import("./views/notifications/allNotifications")
);
const TodoList = React.lazy(() => import("./views/todo/TodoList"));
//const Storemanagement = React.lazy(() => import(' '))
const routes = [
  { path: "/", exact: true, name: "Modules" },
  // Settings
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/no-permission", name: "NoPermission", component: NoPermission },

  {
    path: "/dashboardEmployee",
    name: "Dashboard Employee",
    component: DashboardEmployee,
  },

  { path: "/settings/loantype", name: "LoanTypes", component: LoanTypes },
  { path: "/settings/loanfunds", name: "LoanFunds", component: LoanFunds },
  { path: "/settings/grades", name: "Grades", component: Grades },
  { path: "/settings/leaves", name: "Leaves", component: Leaves },
  { path: "/settings/district", name: "District", component: District },
  {
    path: "/settings/designation",
    name: "Designation",
    component: Designation,
  },
  { path: "/settings/department", name: "Department", component: Department },
  { path: "/settings/punishment", name: "Punishment", component: Punishment },
  { path: "/settings/acrclass", name: "AcrClass", component: AcrClass },
  { path: "/settings/acrtype", name: "AcrType", component: AcrType },
  { path: "/settings/health_info", name: "HealthInfo", component: HealthInfo },
  {
    path: "/settings/document_type",
    name: "DocumentType",
    component: DocumentType,
  },
  //{ path: '/settings/overtime', name: 'Overtime', component: Overtime },
  { path: "/settings/role", name: "Role", component: Role },
  { path: "/settings/users", name: "Users", component: Users },
  { path: "/profile", name: "Profile", component: Profile },
  {
    path: "/notifications",
    name: "Notifications",
    component: AllNotifications,
  },
  {
    path: "/todo",
    name: "Todo List",
    component: TodoList,
  },
  // Human ressources
  { path: "/HR/AddEmployee", name: "Breadcrumbs", component: AddEmployee },
  {
    path: "/HR/UpdateEmployee/:empId",
    name: "Update Employee",
    component: AddEmployee,
  },
  {
    path: "/HR/ViewEmployee/:empId",
    name: "View Employee",
    component: ViewEmployee,
  },
  /* { path: '/HR/AddEducation', name: 'Add Education', component: AddEducation },
  { path: '/HR/AddPromotion', name: 'Add Promotion', component: AddPromotion },
  { path: '/HR/AddTraining', name: 'Add Promotion', component: AddTraining },
*/
  { path: "/HR/listEmployee", name: "Employess", component: ListEmployee },
  { path: "/HR/listEducations", name: "Education", component: ListEducations },
  { path: "/HR/listTraining", name: "Training", component: ListTraining },
  { path: "/HR/listPromotions", name: "Promotion", component: ListPromotions },
  {
    path: "/HR/HealthManagement",
    name: "HealthManagement",
    component: HealthManagement,
  },
  {
    path: "/HR/disciplinemanagement",
    name: "DisciplineManagement",
    component: DisciplineManagement,
  },
  {
    path: "/HR/Loanmanagement",
    name: "Loanmanagement",
    component: Loanmanagement,
  },
  {
    path: "/HR/Leavemanagement",
    name: "Leavemanagement",
    component: Leavemanagement,
  },
  /*{
    path: '/HR/OverTimemanagement',
    name: 'OverTimemanagement',
    component: OverTimemanagement,
  },*/

  {
    path: "/HR/listEducations",
    name: "Educations List ",
    component: ListEducations,
  },
  {
    path: "/HR/listPromotions",
    name: "Promotion List ",
    component: ListPromotions,
  },
  {
    path: "/HR/listTraining",
    name: "Promotion List ",
    component: ListTraining,
  },
  {
    path: "/test-out",

    //onclick: { MyFunction },
    //component: 'HRStotre',
    //    component:{() => {
    //      alert('rr') // window.open('http://192.168.3.7:8081/ ', '_blank')
    //      return null
    //    }},
  },
  // {
  //   path: '/HR/Store',

  //   name: 'Storemanagement',
  //   //component: Storemanagement,
  //   component:{ window.location.href = 'https://iamexternalurl.com'; return null; }},
  // },
  // { path: '/theme', name: 'Theme', component: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  // { path: '/base', name: 'Base', component: Cards, exact: true },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/editors', name: 'Editors', component: CodeEditors, exact: true },
  // { path: '/editors/code-editors', name: 'Code Editors', component: CodeEditors },
  // { path: '/editors/text-editors', name: 'Text Editors', component: TextEditors },
  // { path: '/forms', name: 'Forms', component: BasicForms, exact: true },
  // { path: '/forms/advanced-forms', name: 'Advanced Forms', component: AdvancedForms },
  // { path: '/forms/basic-forms', name: 'Basic Forms', component: BasicForms },
  // { path: '/forms/validation-forms', name: 'Form Validation', component: ValidationForms },
  // { path: '/google-maps', name: 'Google Maps', component: GoogleMaps },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/brands', name: 'Brands', component: Brands },
  // { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  // { path: '/plugins', name: 'Plugins', component: Calendar, exact: true },
  // { path: '/plugins/calendar', name: 'Calendar', component: Calendar },
  // { path: '/plugins/draggable', name: 'Draggable Cards', component: Draggable },
  // { path: '/plugins/spinners', name: 'Spinners', component: Spinners },
  // { path: '/tables', name: 'Tables', component: Tables, exact: true },
  // { path: '/tables/advanced-tables', name: 'Advanced Tables', component: AdvancedTables },
  // { path: '/tables/tables', name: 'Tables', component: Tables },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/apps', name: 'Apps', component: Invoice, exact: true },
  // { path: '/apps/invoicing', name: 'Invoice', component: Invoice, exact: true },
  // { path: '/apps/invoicing/invoice', name: 'Invoice', component: Invoice },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
  // { path: '/apps/email/inbox', exact: true, name: 'Inbox' },
  // { path: '/apps/email/compose', exact: true, name: 'Compose' },
  // { path: '/apps/email/message', exact: true, name: 'Message' }
];

export default routes;

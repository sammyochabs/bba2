import React, { lazy, useRef, useState, useEffect } from "react";
import { CButtonGroup, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { getStyle, hexToRgba } from "@coreui/utils";

import { fetchAdminData, fetchGrapheData } from "src/services/apiCalls.js";
import { CChartLine, CChartBar } from "@coreui/react-chartjs";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  //States to control Changing Graphs
  const overtimeActiveValue = useRef();
  const [overtimeDisplay, setOvertimeDisplay] = useState("Month");
  const loanActiveValue = useRef();
  const [loanDisplay, setLoanDisplay] = useState("Month");
  const leaveActiveValue = useRef();
  const [leaveDisplay, setLeaveDisplay] = useState("Month");
  const disciplineActiveValue = useRef();
  const [disciplineDisplay, setDisciplineDisplay] = useState("Month");
  const employeeActiveValue = useRef();
  const [employeeDisplay, setEmployeeDisplay] = useState("Month");

  //Admin Data
  const [adminData, setAdminData] = useState();

  /*************Graphs************/

  //Loan
  const [loanMonthData, setLoanMonthData] = useState([]);
  const [loanDepartmentData, setLoanDepartmentData] = useState([]);
  const [loanGradeData, setLoanGradeData] = useState([]);

  //Leave
  const [leaveMonthData, setLeaveMonthData] = useState([]);
  const [leaveDepartmentData, setLeaveDepartmentData] = useState([]);
  const [leaveGradeData, setLeaveGradeData] = useState([]);

  //Discipline
  const [disciplineMonthData, setDisciplineMonthData] = useState([]);
  const [disciplineDepartmentData, setDisciplineDepartmentData] = useState([]);
  const [disciplineGradeData, setDisciplineGradeData] = useState([]);

  //Overtime
  const [overtimeMonthData, setOvertimeMonthData] = useState([]);
  const [overtimeDepartmentData, setOvertimeDepartmentData] = useState([]);
  const [overtimeGradeData, setOvertimeGradeData] = useState([]);

  //Employee Leave-Hire
  const [employeeLHMonth, setEmployeeLHMonth] = useState([]);
  const [employeeLHDepartment, setEmployeeLHDepartment] = useState([]);
  const [employeeLHGrade, setEmployeeLHGrade] = useState([]);
  useEffect(() => {
    //Call For Admin Data
    const fetchDataAdmin = async () => {
      const fetchedAdminData = await fetchAdminData(1);
      setAdminData(fetchedAdminData);
    };

    /***********Calls For Graphs ******************/

    //Calls For Loans
    const fetchLoanMonth = async () => {
      const fetchedLoanMonth = await fetchGrapheData(1, "Loan", "Month");
      setLoanMonthData(fetchedLoanMonth);
    };
    const fetchLoanDepartment = async () => {
      const fetchedLoanDepartment = await fetchGrapheData(
        1,
        "Loan",
        "Department"
      );
      setLoanDepartmentData(fetchedLoanDepartment);
    };
    const fetchLoanGrade = async () => {
      const fetchedLoanGrade = await fetchGrapheData(1, "Loan", "Grade");
      setLoanGradeData(fetchedLoanGrade);
    };

    //Calls for Leave
    const fetchLeaveMonth = async () => {
      const fetchedLeaveMonth = await fetchGrapheData(1, "Leave", "Month");
      setLeaveMonthData(fetchedLeaveMonth);
    };
    const fetchLeaveDepartment = async () => {
      const fetchedLeaveDepartment = await fetchGrapheData(
        1,
        "Leave",
        "Department"
      );
      setLeaveDepartmentData(fetchedLeaveDepartment);
    };
    const fetchLeaveGrade = async () => {
      const fetchedLeaveGrade = await fetchGrapheData(1, "Leave", "Grade");
      setLeaveGradeData(fetchedLeaveGrade);
    };

    //Calls for overtime
    const fetchDisciplineMonth = async () => {
      const fetchedDisciplineMonth = await fetchGrapheData(
        1,
        "Discipline",
        "Month"
      );
      setDisciplineMonthData(fetchedDisciplineMonth);
    };
    const fetchDisciplineDepartment = async () => {
      const fetchedDisciplineDepartment = await fetchGrapheData(
        1,
        "Discipline",
        "Department"
      );
      setDisciplineDepartmentData(fetchedDisciplineDepartment);
    };
    const fetchDisciplineGrade = async () => {
      const fetchedDisciplineGrade = await fetchGrapheData(
        1,
        "Discipline",
        "Grade"
      );
      setDisciplineGradeData(fetchedDisciplineGrade);
    };
    //Calls for Dicipline
    /*const fetchOvertimeMonth = async () => {
      const fetchedOvertimeMonth = await fetchGrapheData(1, 'Overtime', 'Month')
      setOvertimeMonthData(fetchedOvertimeMonth)
    }
    const fetchOvertimeDepartment = async () => {
      const fetchedOvertimeDepartment = await fetchGrapheData(1, 'Overtime', 'Department')
      setOvertimeDepartmentData(fetchedOvertimeDepartment)
    }
    const fetchOvertimeGrade = async () => {
      const fetchedOvertimeGrade = await fetchGrapheData(1, 'Overtime', 'Grade')
      setOvertimeGradeData(fetchedOvertimeGrade)
    }*/

    //Call For Employee Leave Hire
    const fetchEmployeeLHMonth = async () => {
      const fetchedEmployeeLHMonth = await fetchGrapheData(
        1,
        "Employee",
        "Month"
      );
      console.log("New Data", fetchedEmployeeLHMonth);
      setEmployeeLHMonth(fetchedEmployeeLHMonth);
    };
    const fetchEmployeeLHDepartment = async () => {
      const fetchedEmployeeLHDepartment = await fetchGrapheData(
        1,
        "Employee",
        "Department"
      );
      console.log("New Data", fetchedEmployeeLHDepartment);
      setEmployeeLHDepartment(fetchedEmployeeLHDepartment);
    };
    const fetchEmployeeLHGrade = async () => {
      const fetchedEmployeeLHGrade = await fetchGrapheData(
        1,
        "Employee",
        "Grade"
      );
      console.log("New Data", fetchedEmployeeLHGrade);
      setEmployeeLHGrade(fetchedEmployeeLHGrade);
    };

    fetchDataAdmin();
    fetchLoanMonth();
    fetchLoanDepartment();
    fetchLoanGrade();
    fetchLeaveMonth();
    fetchLeaveDepartment();
    fetchLeaveGrade();
    fetchDisciplineMonth();
    fetchDisciplineDepartment();
    fetchDisciplineGrade();
    //fetchOvertimeMonth()
    //fetchOvertimeDepartment()
    //fetchOvertimeGrade()
    fetchEmployeeLHMonth();
    fetchEmployeeLHDepartment();
    fetchEmployeeLHGrade();
  }, []);

  //Methods That react to state change
  const handleLeaveChange = (e) => {
    e.preventDefault();
    setLeaveDisplay(leaveActiveValue.current.value);
  };
  const handleEmployeeChange = (e) => {
    e.preventDefault();
    setEmployeeDisplay(employeeActiveValue.current.value);
  };
  /* const handleovertimeChange = (e) => {
    e.preventDefault()
    setOvertimeDisplay(overtimeActiveValue.current.value)
  }*/
  const handleDisciplineChange = (e) => {
    e.preventDefault();
    setDisciplineDisplay(disciplineActiveValue.current.value);
  };
  const handleLoanChange = (e) => {
    e.preventDefault();
    setLoanDisplay(loanActiveValue.current.value);
  };

  return (
    <>
      <WidgetsDropdown admin adminData={adminData} />
      <WidgetsBrand withCharts admin adminData={adminData} />
      <CCard
        className="mb-4"
        style={{ backgroundColor: "#ebedef", border: "none" }}
      >
        {/* <CCardBody
          style={{ backgroundColor: '#fff', border: '2px solid #dee1e3', marginTop: '30px' }}
        >
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Annual Overtime
              </h4>
              <div className="small text-medium-emphasis">January - December 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-right me-3">
                <select
                  ref={overtimeActiveValue}
                  onChange={handleovertimeChange}
                  color="outline-secondary"
                  className="mx-0"
                  style={{ padding: '5px 5px', borderRadius: '3px' }}
                >
                  <option selected>Month</option>
                  <option>Department</option>
                  <option>Grade</option>
                </select>
              </CButtonGroup>
            </CCol>
          </CRow>
          {overtimeDisplay === 'Month' && (
            <CChartLine
              style={{ height: '300px', marginTop: '40px' }}
              label = {overtimeMonthData?.map((data) => data.Label)}
                datasets = {[
                  {
                    label: 'Ovetime',
                    backgroundColor: hexToRgba('#3399ff', 10),
                    borderColor: '#3399ff',
                    pointHoverBackgroundColor: '#3399ff',
                    borderWidth: 2,
                    data: overtimeMonthData?.map((data) => data.Value),
                    fill: true,
                  },
                ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          )}
          {overtimeDisplay === 'Grade' && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '300px', marginTop: '40px' }}
              labels = {overtimeGradeData?.map((data) => data.Label)}
                datasets= { [
                  {
                    label: 'Overtime',
                    backgroundColor: '#3399ff',
                    borderColor: '#fff',
                    pointHoverBackgroundColor: '#3399ff',
                    borderWidth: 2,
                    data: overtimeGradeData?.map((data) => data.Value),
                    barPercentage: 0.6,
                  },
                ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: true,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
          {overtimeDisplay === 'Department' && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '300px', marginTop: '40px' }}
               labels =  {overtimeDepartmentData?.map((data) => data.Label)}
                datasets= {[
                  {
                    label: 'Overtime',
                    backgroundColor: '#3399ff',
                    borderColor: '#fff',
                    pointHoverBackgroundColor: '#3399ff',
                    borderWidth: 2,
                    data: overtimeDepartmentData?.map((data) => data.Value),
                    barPercentage: 0.6,
                  },
                ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
            </CCardBody>*/}
        <CCardBody
          style={{
            backgroundColor: "#fff",
            border: "2px solid #dee1e3",
            marginTop: "30px",
          }}
        >
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Annual Leave
              </h4>
              <div className="small text-medium-emphasis">
                January - December 2021
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-right me-3">
                <select
                  ref={leaveActiveValue}
                  onChange={handleLeaveChange}
                  color="outline-secondary"
                  className="mx-0"
                  style={{ padding: "5px 5px", borderRadius: "3px" }}
                >
                  <option selected>Month</option>
                  <option>Department</option>
                  <option>Grade</option>
                </select>
              </CButtonGroup>
            </CCol>
          </CRow>
          {leaveDisplay === "Month" && (
            <CChartLine
              style={{ height: "300px", marginTop: "40px" }}
              labels={leaveMonthData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "No of Leaves",
                  backgroundColor: hexToRgba("#3399ff", 10),
                  borderColor: "#3399ff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: leaveMonthData?.map((data) => data.Value),
                  fill: true,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          )}
          {leaveDisplay === "Grade" && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "300px", marginTop: "40px" }}
              labels={leaveGradeData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "No of Leaves",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: leaveGradeData?.map((data) => data.Value),
                  barPercentage: 0.6,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
          {leaveDisplay === "Department" && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "300px", marginTop: "40px" }}
              labels={leaveDepartmentData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "No of Leaves",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: leaveDepartmentData?.map((data) => data.Value),
                  barPercentage: 0.6,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
        </CCardBody>
        <CCardBody
          style={{
            backgroundColor: "#fff",
            border: "2px solid #dee1e3",
            marginTop: "30px",
          }}
        >
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Annual Loan
              </h4>
              <div className="small text-medium-emphasis">
                January - December 2021
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-right me-3">
                <select
                  ref={loanActiveValue}
                  onChange={handleLoanChange}
                  color="outline-secondary"
                  className="mx-0"
                  style={{ padding: "5px 5px", borderRadius: "3px" }}
                >
                  <option selected>Month</option>
                  <option>Department</option>
                  <option>Grade</option>
                </select>
              </CButtonGroup>
            </CCol>
          </CRow>
          {loanDisplay === "Month" && (
            <CChartLine
              style={{ height: "300px", marginTop: "40px" }}
              labels={loanMonthData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Loan",
                  backgroundColor: hexToRgba("#3399ff", 10),
                  borderColor: "#3399ff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: loanMonthData?.map((data) => data.Value),
                  fill: true,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          )}
          {loanDisplay === "Grade" && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "300px", marginTop: "40px" }}
              labels={loanGradeData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Loan",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: loanGradeData?.map((data) => data.Value),
                  barPercentage: 0.6,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
          {loanDisplay === "Department" && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "300px", marginTop: "40px" }}
              labels={loanDepartmentData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Loan",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: loanDepartmentData?.map((data) => data.Value),
                  barPercentage: 0.6,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
        </CCardBody>
        <CCardBody
          style={{
            backgroundColor: "#fff",
            border: "2px solid #dee1e3",
            marginTop: "30px",
          }}
        >
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Annual Employee Leave-hire
              </h4>
              <div className="small text-medium-emphasis">
                January - December 2021
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-right me-3">
                <select
                  ref={employeeActiveValue}
                  onChange={handleEmployeeChange}
                  color="outline-secondary"
                  className="mx-0"
                  style={{ padding: "5px 5px", borderRadius: "3px" }}
                >
                  <option selected>Month</option>
                  <option>Department</option>
                  <option>Grade</option>
                </select>
              </CButtonGroup>
            </CCol>
          </CRow>
          {employeeDisplay === "Month" && (
            <CChartLine
              style={{ height: "300px", marginTop: "40px" }}
              labels={employeeLHMonth?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Hire",
                  backgroundColor: hexToRgba("#2eb85c", 10),
                  borderColor: "#2eb85c",
                  pointHoverBackgroundColor: "#2eb85c",
                  borderWidth: 2,
                  data: employeeLHMonth?.map((data) => data.Hire),
                  fill: true,
                },
                {
                  label: "Leave",
                  backgroundColor: hexToRgba("#e55353", 10),
                  borderColor: "#e55353",
                  pointHoverBackgroundColor: "#e55353",
                  borderWidth: 2,
                  data: employeeLHMonth?.map((data) => data.Leave),
                  fill: true,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          )}
          {employeeDisplay === "Grade" && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "300px", marginTop: "40px" }}
              labels={employeeLHGrade?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Hire",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: getStyle("--cui-success"),
                  borderWidth: 2,
                  data: employeeLHGrade?.map((data) => data.Hire),
                  barPercentage: 0.6,
                },
                {
                  label: "Leave",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: getStyle("--cui-danger"),
                  borderWidth: 2,
                  data: employeeLHGrade?.map((data) => data.Leave),
                  barPercentage: 0.6,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
          {employeeDisplay === "Department" && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "300px", marginTop: "40px" }}
              labels={employeeLHDepartment?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Hire",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: getStyle("--cui-success"),
                  borderWidth: 2,
                  data: employeeLHDepartment?.map((data) => data.Hire),
                  barPercentage: 0.6,
                },
                {
                  label: "Leave",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: getStyle("--cui-danger"),
                  borderWidth: 2,
                  data: employeeLHDepartment?.map((data) => data.Leave),
                  barPercentage: 0.6,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
        </CCardBody>
        <CCardBody
          style={{
            backgroundColor: "#fff",
            border: "2px solid #dee1e3",
            marginTop: "30px",
          }}
        >
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Annual Discipline
              </h4>
              <div className="small text-medium-emphasis">
                January - December 2021
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-right me-3">
                <select
                  ref={disciplineActiveValue}
                  onChange={handleDisciplineChange}
                  color="outline-secondary"
                  className="mx-0"
                  style={{ padding: "5px 5px", borderRadius: "3px" }}
                >
                  <option selected>Month</option>
                  <option>Department</option>
                  <option>Grade</option>
                </select>
              </CButtonGroup>
            </CCol>
          </CRow>
          {disciplineDisplay === "Month" && (
            <CChartLine
              style={{ height: "300px", marginTop: "40px" }}
              labels={disciplineMonthData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Discipline",
                  backgroundColor: hexToRgba("#3399ff", 10),
                  borderColor: "#3399ff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: disciplineMonthData?.map((data) => data.Value),
                  fill: true,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          )}
          {disciplineDisplay === "Grade" && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "300px", marginTop: "40px" }}
              labels={disciplineGradeData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Discipline",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: disciplineGradeData?.map((data) => data.Value),
                  barPercentage: 0.6,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
          {disciplineDisplay === "Department" && (
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "300px", marginTop: "40px" }}
              labels={disciplineDepartmentData?.map((data) => data.Label)}
              datasets={[
                {
                  label: "Discipline",
                  backgroundColor: "#3399ff",
                  borderColor: "#fff",
                  pointHoverBackgroundColor: "#3399ff",
                  borderWidth: 2,
                  data: disciplineDepartmentData?.map((data) => data.Value),
                  barPercentage: 0.6,
                },
              ]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
              }}
            />
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;

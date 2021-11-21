import React, { useRef, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import PropTypes from "prop-types";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdown = ({ adminData }) => {
  const LPRValue = useRef();
  const [LPRDuration, setLPRDuration] = useState("3");

  //Method To Handle LPR Change
  const handleLPRChange = (e) => {
    e.preventDefault();
    setLPRDuration(LPRValue.current.value);
  };
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={<>{adminData?.Employee}</>}
          text="Employees"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={
            (LPRDuration === "3" && <> {adminData?.LRP3} </>) ||
            (LPRDuration === "6" && <> {adminData?.LRP6} </>) ||
            (LPRDuration === "12" && <> {adminData?.LRP12} </>)
          }
          text="Eligible For LPR"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        >
          <select
            ref={LPRValue}
            onChange={handleLPRChange}
            style={{
              borderRadius: "5px",
              padding: "0",
              background: "#3399ff",
              border: "none",
              color: "#fff",
              outline: "none",
            }}
          >
            <option>3</option>
            <option>6</option>
            <option>12</option>
          </select>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={adminData?.ACR}
          text="ACR"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-success"
          header={adminData?.Health}
          text="Health"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(50,205,50)"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

WidgetsDropdown.propTypes = {
  adminData: PropTypes.object,
};

export default WidgetsDropdown;

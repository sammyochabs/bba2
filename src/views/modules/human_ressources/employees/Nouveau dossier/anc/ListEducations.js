import React from "react";
import { Link } from "react-router-dom";

import {
  CBadge,
  CButton,
  CDataTable,
  CLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const ListEducations = ({ user }) => {
  const usersData = [
    {
      id: 0,
      employee: "John Doe",
      department: "IT",
      results: "Success",
      distinction: "A+",
      passing_year: "2016",
    },
    {
      id: 0,
      employee: "John whick",
      department: "IT",
      results: "Success",
      distinction: "A+",
      passing_year: "2019",
    },
    {
      id: 0,
      employee: "Fama Dridi",
      department: "Science",
      results: "Success",
      distinction: "A+",
      passing_year: "2006",
    },
    {
      id: 0,
      employee: "Ali Hosni",
      department: "Science",
      results: "Fail",
      distinction: "",
      passing_year: "2000",
    },
  ];
  const fields = [
    { key: "employee", _style: { width: "20%" } },
    { key: "department", _style: { width: "20%" } },
    "results",
    { key: "distinction", _style: { width: "30%" } },
    { key: "passing_year", _style: { width: "30%" } },
    {
      key: "action",
      label: "Action",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];
  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <div>
      <CLabel htmlFor="select">All Educations </CLabel>

      <div style={{ float: "right", marginBottom: 30 }}>
        <Link to="/HR/AddEducation">
          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            onClick={() => {}}
          >
            Add Education
          </CButton>
        </Link>
      </div>

      <CDataTable
        items={usersData}
        fields={fields}
        columnFilter
        footer
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          image: (item) => (
            <img
              alt={item.employee}
              src={item.image}
              width={150}
              height={100}
              style={{ padding: 10 }}
            />
          ),
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)} alt="hello">
                {item.status}
              </CBadge>
            </td>
          ),
          action: (item, index) => {
            return (
              <td className="py-2">
                <CDropdown className="m-1">
                  <CDropdownToggle>
                    <CIcon name="cil-settings" alt="CoreUI Icons Settings" />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>Update</CDropdownItem>
                    <CDropdownItem>Delete</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            );
          },
        }}
      />
    </div>
  );
};

export default ListEducations;

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

const ListTraining = ({ user }) => {
  const usersData = [
    {
      id: 0,
      employee: "John Doe",
      local: "Maroc",
      course_title: "IOT",
      location: "Paris",
    },
    {
      id: 0,
      employee: "ALi Alg",
      local: "Maroc",
      course_title: "IOT",
      location: "Paris",
    },
  ];
  const fields = [
    { key: "employee", _style: { width: "20%" } },
    { key: "local", _style: { width: "20%" } },
    "course_title",
    { key: "location", _style: { width: "30%" } },
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
      <CLabel htmlFor="select">All Trainings </CLabel>

      <div style={{ float: "right", marginBottom: 30 }}>
        <Link to="/HR/AddTraining">
          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            onClick={() => {}}
          >
            Add Training
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

export default ListTraining;

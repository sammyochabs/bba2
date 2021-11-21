import React, { useState } from "react";
import {
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Edit, Trash, Check, Eye, X } from "react-feather";
import { useDispatch } from "react-redux";

import EmpLeaveModal from "./EmpLeaveModal";
import {
  approveLeave,
  cancelLeave,
  deleteLeave,
} from "src/actions/HumanRessource/empleave";

const EmpLeaveTable = ({
  leavesData,
  userID,
  emplist,
  leavelist,
  editPermission,
  viewPermission,
  deletePermission,
  approvePermission,
  declinePermission,
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [leaveId, setCurrentLeaveId] = useState();
  const [modal_btn, setCurrenttype] = useState("Add");
  var [leave_selected_obj, setCurrentLeaveRecord] = useState();

  const handleUpdate = (id, modal_btn) => {
    setModal(!modal);

    setCurrentLeaveId(id);
    setCurrenttype(modal_btn);

    if (leavesData != undefined) {
      leave_selected_obj = leavesData.find((item) => {
        return item.EmployeeLeaveID == id;
      });
      console.log(leave_selected_obj, "leave_selected_obj");
      setCurrentLeaveRecord(leave_selected_obj);
    }
  };

  if (leavesData != undefined) {
    leavesData.map((element, index) => {
      element.status = element.Status;
    });
  }

  const fields = [
    { key: "EmployeeLeaveID", label: "ID", _style: { width: "5%" } },
    { key: "EmployeeName", _style: { width: "30%" } },
    { key: "Leave", label: "Leave" },
    { key: "Cause", label: "Cause" },
    { key: "FromDate", label: "From Date" },
    { key: "ToDate", label: "To Date" },
    // { key: "Duration", label: "Duration" },

    { key: "status", label: "Status" },

    "Action",
  ];

  const getBadge = (status) => {
    console.log(status, "status");
    switch (status) {
      case "Approved":
        return "success";
      case "Inactive":
        return "secondary";
      case "New":
        return "warning";
      case "Canceled":
        return "danger";
      default:
        return "primary";
    }
  };

  var formData = new FormData();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      formData.append("UserId", localStorage.getItem("userID"));
      formData.append("LeaveId", id);
      dispatch(deleteLeave(formData, userID));
    }
  };

  const handleApprove = (id) => {
    if (window.confirm("Are you sure?")) {
      formData.append("UserId", localStorage.getItem("userID"));
      formData.append("LeaveId", id);
      dispatch(approveLeave(formData, userID));
    }
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure?")) {
      formData.append("UserId", localStorage.getItem("userID"));
      formData.append("LeaveId", id);
      dispatch(cancelLeave(formData, userID));
    }
  };
  return (
    <div>
      <CDataTable
        items={leavesData}
        fields={fields}
        columnFilter
        tableFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={50}
        hover
        sorter
        striped
        pagination
        // loading
        // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
        // onPageChange={(val) => console.log('new page:', val)}
        // onPagesChange={(val) => console.log('new pages:', val)}
        // onPaginationChange={(val) => console.log('new pagination:', val)}
        // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
        // onSorterValueChange={(val) => console.log('new sorter value:', val)}
        // onTableFilterChange={(val) => console.log('new table filter:', val)}
        // onColumnFilterChange={(val) => console.log('new column filter:', val)}
        scopedSlots={{
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          Action: (item) => {
            return (
              <td className="py-2">
                <CDropdown className="m-1">
                  <CDropdownToggle>
                    <CIcon name={"cilSettings"} size={"lg"} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      hidden={item.status != "New"}
                      onClick={() => {
                        if (approvePermission === 1) {
                          handleApprove(item.EmployeeLeaveID);
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <Check className="c-iconmd-lg mr-3" />
                      Approve
                    </CDropdownItem>

                    <CDropdownItem
                      hidden={item.status != "New"}
                      onClick={() => {
                        if (declinePermission === 1) {
                          handleCancel(item.EmployeeLeaveID);
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <X className="c-iconmd-lg mr-3" />
                      Decline
                    </CDropdownItem>

                    <CDropdownItem
                      hidden={item.status != "New"}
                      onClick={() => {
                        if (editPermission === 1) {
                          handleUpdate(item.EmployeeLeaveID, "Update");
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <Edit className="c-iconmd-lg mr-3" />
                      Edit
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        if (viewPermission === 1) {
                          handleUpdate(item.EmployeeLeaveID, "View");
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <Eye className="c-iconmd-lg mr-3" />
                      View
                    </CDropdownItem>
                    <CDropdownItem
                      hidden={item.status != "New"}
                      onClick={() => {
                        if (deletePermission === 1) {
                          handleDelete(item.EmployeeLeaveID, "Delete");
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <Trash className="c-icon-lg mr-3" />
                      Delete
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            );
          },
        }}
      />
      <EmpLeaveModal
        toggle={handleUpdate}
        modal={modal}
        type={modal_btn}
        title={modal_btn}
        currentValue={leaveId}
        emplist={emplist}
        leavelist={leavelist}
        leave_selected_obj={leave_selected_obj}
      />
    </div>
  );
};

export default EmpLeaveTable;

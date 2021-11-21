import React, { useState } from "react";
import {
  CButton,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
  CContainer,
  CRow,
  CCol,
  CSelect,
  CTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Edit, Trash, Check, X, Eye } from "react-feather";
import { useDispatch } from "react-redux";
import EmpLoanModal from "./EmpLoanModal";
import {
  approveLoan,
  cancelLoan,
  deleteLoan,
} from "src/actions/HumanRessource/emploan";

const EmpLoanTable = ({
  empLoan,
  userID,
  type,
  emplist,
  loantypes,
  loanfunds,
  editPermission,
  viewPermission,
  deletePermission,
  approvePermission,
  declinePermission,
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [modal_btn, setCurrenttype] = useState("Add");
  var [loan_selected_obj, setCurrentLoanRecord] = useState();

  const handleUpdate = (id, modal_btn) => {
    setModal(!modal);
    setCurrentId(id);
    setCurrenttype(modal_btn);

    if (empLoan != undefined) {
      loan_selected_obj = empLoan.find((item) => {
        return item.EmployeeLoanID == id;
      });
      console.log(loan_selected_obj, "loan_selected_obj");
      setCurrentLoanRecord(loan_selected_obj);
    }
  };
  console.log(empLoan);

  const loansData = empLoan;
  if (loansData != undefined) {
    loansData.map((element, index) => {
      element.status = element.Status;
    });
  }

  const fields = [
    // { key: "EmployeeLoanID", label: "ID ", _style: { width: "5%" } },
    { key: "EmployeeLoanID", label: "ID", _style: { width: "5%" } },
    { key: "SanctionDate", label: "Request Date", _style: { width: "15%" } },
    { key: "EmployeeName", label: "Employee", _style: { width: "20%" } },
    { key: "LoanType", label: "Loan Type" },
    { key: "LoanFunds", label: "Loan Funds" },
    { key: "LoanAmount", label: "Amount" },
    { key: "SanctionDate", label: "Sanction Date" },
    { key: "status", label: "Status", _style: { width: "10%" } },
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
      formData.append("LoanID", id);
      dispatch(deleteLoan(formData, userID));
    }
  };

  const handleInput = (e) => {
    // setData({ ...data, [e.target.name]: e.target.value });
    // return console.log(data);
  };

  const handleApprove = (id) => {
    if (window.confirm("Are you sure to approve this Loan?")) {
      formData.append("UserId", localStorage.getItem("userID"));
      formData.append("LoanID", id);
      dispatch(approveLoan(formData, userID));
    }
  };
  const handleCancel = (id) => {
    if (window.confirm("Are you sure to decline this Loan?")) {
      formData.append("UserId", localStorage.getItem("userID"));
      formData.append("LoanID", id);
      dispatch(cancelLoan(formData, userID));
    }
  };
  return (
    <div>
      <CDataTable
        items={loansData}
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
                          handleApprove(item.EmployeeLoanID, "Approve");
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
                          handleCancel(item.EmployeeLoanID, "Decline");
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
                          handleUpdate(item.EmployeeLoanID, "Update");
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
                          handleUpdate(item.EmployeeLoanID, "View");
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
                          handleDelete(item.EmployeeLoanID);
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
      <EmpLoanModal
        toggle={handleUpdate}
        modal={modal}
        type={modal_btn}
        title={modal_btn}
        currentValue={currentId}
        loan_selected_obj={loan_selected_obj}
        emplist={emplist}
        loantypes={loantypes}
        loanfunds={loanfunds}
      />
    </div>
  );
};

export default EmpLoanTable;

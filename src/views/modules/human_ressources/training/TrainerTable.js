import React, { useState } from "react";
import {
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Edit, Trash } from "react-feather";
import { useDispatch } from "react-redux";
import { deleteEducation } from "src/actions/HumanRessource/Trainer.services";
import TrainerModal from "./TrainerModal";
import TrainerViewModal from "./TrainerViewModal";
const TrainerTable = ({
  employeeList,
  userID,
  employeedropdown,
  reInitalizeList,
  editPermission,
  viewPermission,
  deletePermission,
  responseModal,
  setResponseModal,
}) => {
  const [modal, setModal] = useState(false);
  const [viewmodal, setViewModal] = useState(false);
  const [educationId, setCurrentEducationId] = useState();
  const [employee, setEmployee] = useState();

  const fields = [
    { key: "Name", _style: { width: "10%" } },
    { key: "CourseTitle", _style: { width: "10%" } },
    { key: "TrainingType", _style: { width: "10%" } },
    { key: "FromDate", _style: { width: "10%" } },
    { key: "ToDate", _style: { width: "10%" } },
    { key: "Position", _style: { width: "20%" } },
    { key: "Institution", _style: { width: "20%" } },
    "Action",
  ];
  const handleUpdate = (id) => {
    let _employeeList = employeeList.filter((el) => el.TrainingID == id)[0];
    setModal(!modal);
    setEmployee({
      ..._employeeList,
    });
    setCurrentEducationId(id);
    console.log(educationId);
  };

  const closeModal = () => {
    setViewModal(false);
    setModal(false);
  };

  const handleView = (id) => {
    let _employeeList = employeeList.filter((el) => el.TrainingID == id)[0];
    setViewModal(!modal);
    setEmployee({
      ..._employeeList,
    });
    setCurrentEducationId(id);
  };

  const handleDelete = async (id) => {
    try {
      let deleteResp = await deleteEducation(userID, id);
      if (deleteResp.status == "200") reInitalizeList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CDataTable
        items={employeeList}
        fields={fields}
        columnFilter
        tableFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={5}
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
          Name: (item) => <td>{item.EmployeeName}</td>,
          CourseTitle: (item) => <td>{item.CourseTitle}</td>,
          TrainingType: (item) => <td>{item.TrainingType}</td>,
          FromDate: (item) => <td>{item.FromDate}</td>,
          ToDate: (item) => <td>{item.ToDate}</td>,
          Position: (item) => <td>{item.Position}</td>,
          Institution: (item) => <td>{item.Institution}</td>,
          Action: (item) => {
            return (
              <td className="py-2">
                <CDropdown className="m-1">
                  <CDropdownToggle>
                    <CIcon name={"cilSettings"} size={"lg"} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={() => {
                        if (viewPermission === 1) {
                          handleView(item.TrainingID);
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <Edit className="c-iconmd-lg mr-3" />
                      View
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        if (editPermission === 1) {
                          handleUpdate(item.TrainingID);
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
                        if (deletePermission === 1) {
                          handleDelete(item.TrainingID);
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
      <TrainerViewModal
        userID={userID}
        toggle={closeModal}
        modal={viewmodal}
        type={"Update"}
        title={"View Trainer"}
        currentValue={educationId}
        employee={employee}
        employeedropdown={employeedropdown}
        isEdiableName={true}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
      />
      <TrainerModal
        userID={userID}
        toggle={closeModal}
        modal={modal}
        type={"Update"}
        title={"Update Employee"}
        currentValue={educationId}
        employee={employee}
        employeedropdown={employeedropdown}
        isEdiableName={true}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
        reInitalizeList={reInitalizeList}
      />
    </div>
  );
};

export default TrainerTable;

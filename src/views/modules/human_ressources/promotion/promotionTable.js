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
import { deleteEducation } from "src/actions/HumanRessource/promotion.services";
import PromotionModal from "./promotionModal";
import PromotionViewModal from "./promotionViewModal";
const PromotionTable = ({
  employeeList,
  userID,
  employeedropdown,
  desginationdropdown,
  gradedropdown,
  clearfields,
  employeeName,
  setemployeeName,
  reInitalizeList,
  Type,
  setType,
  designation,
  setdesignation,
  organization,
  setOrganization,
  postingType,
  setPostingType,
  Location,
  setLocation,
  FromDate,
  setFromDate,
  ToDate,
  setToDate,
  promotionDate,
  setPromotionDate,
  GradeORPayscale,
  setGradeORPayscale,
  Grade,
  setGrade,
  editPermission,
  viewPermission,
  deletePermission,
  responseModal,
  setResponseModal,
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [viewmodal, setViewModal] = useState(false);
  const [educationId, setCurrentEducationId] = useState();
  const [employee, setEmployee] = useState();
  const fields = [
    { key: "Name", _style: { width: "10%" } },
    { key: "type", _style: { width: "10%" } },
    { key: "Designation", _style: { width: "10%" } },
    { key: "Organization", _style: { width: "10%" } },
    { key: "PostingType", _style: { width: "10%" } },
    { key: "Location", _style: { width: "20%" } },
    { key: "Promotion/Charge Date", _style: { width: "20%" } },
    { key: "DateFrom", _style: { width: "20%" } },
    { key: "DateTo", _style: { width: "20%" } },
    "Action",
  ];
  var formData = new FormData();
  const handleUpdate = (id) => {
    let _employeeList = employeeList.filter((el) => el.PromotionID == id)[0];
    setModal(!modal);
    setEmployee({
      ..._employeeList,
    });
    setResponseModal(false);
    setCurrentEducationId(id);
  };

  const closeModal = () => {
    setViewModal(false);
    setModal(false);
  };

  const viewModal = (id) => {
    let _employeeList = employeeList.filter((el) => el.PromotionID == id)[0];
    setViewModal(!viewmodal);
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
          type: (item) => <td>{item.PromotionType}</td>,
          Designation: (item) => <td>{item.Designation}</td>,
          Organization: (item) => <td>{item.Organization}</td>,
          PostingType: (item) => <td>{item.PostingType}</td>,
          Location: (item) => <td>{item.Location}</td>,
          "Promotion/Charge Date": (item) => <td>{item.PromotionDate}</td>,
          DateFrom: (item) => <td>{item.DateFrom}</td>,
          DateTo: (item) => <td>{item.DateTo}</td>,
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
                          viewModal(item.PromotionID);
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
                          handleUpdate(item.PromotionID);
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
                          handleDelete(item.PromotionID);
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
      <PromotionViewModal
        userID={userID}
        toggle={closeModal}
        modal={viewmodal}
        type={"Update"}
        title={"View Promotion/Charge"}
        currentValue={educationId}
        employee={employee}
        employeedropdown={employeedropdown}
        isEdiableName={true}
        desginationdropdown={desginationdropdown}
        gradedropdown={gradedropdown}
        setemployeeName={setemployeeName}
        employeeName={employeeName}
        Type={Type}
        setType={setType}
        designation={designation}
        setdesignation={setdesignation}
        organization={organization}
        setOrganization={setOrganization}
        postingType={postingType}
        setPostingType={setPostingType}
        Location={Location}
        setLocation={setLocation}
        FromDate={FromDate}
        setFromDate={setFromDate}
        ToDate={ToDate}
        setToDate={setToDate}
        promotionDate={promotionDate}
        setPromotionDate={setPromotionDate}
        GradeORPayscale={GradeORPayscale}
        setGradeORPayscale={setGradeORPayscale}
        Grade={Grade}
        setGrade={setGrade}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
        reInitalizeList={reInitalizeList}
      />
      <PromotionModal
        userID={userID}
        toggle={closeModal}
        modal={modal}
        type={"Update"}
        title={"Update Employee"}
        currentValue={educationId}
        employee={employee}
        employeedropdown={employeedropdown}
        isEdiableName={true}
        desginationdropdown={desginationdropdown}
        gradedropdown={gradedropdown}
        setemployeeName={setemployeeName}
        employeeName={employeeName}
        Type={Type}
        setType={setType}
        designation={designation}
        setdesignation={setdesignation}
        organization={organization}
        setOrganization={setOrganization}
        postingType={postingType}
        setPostingType={setPostingType}
        Location={Location}
        setLocation={setLocation}
        FromDate={FromDate}
        setFromDate={setFromDate}
        ToDate={ToDate}
        setToDate={setToDate}
        promotionDate={promotionDate}
        setPromotionDate={setPromotionDate}
        GradeORPayscale={GradeORPayscale}
        setGradeORPayscale={setGradeORPayscale}
        Grade={Grade}
        setGrade={setGrade}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
        reInitalizeList={reInitalizeList}
      />
    </div>
  );
};

export default PromotionTable;

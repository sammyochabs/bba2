import React, { useState } from "react";
import {
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Edit, Trash, Eye } from "react-feather";
import { useDispatch } from "react-redux";
import { deleteHealthRecord } from "src/actions/HumanRessource/healthrecords";
import HealthEditModal from "src/views/modules/human_ressources/healthmanagement/HealthEditModal";
import { getEmployeeList } from "src/actions/HumanRessource/employees";
import { getHealthInfoList } from "src/actions/HumanRessource/healthInfo";
import { getHealthView } from "src/actions/HumanRessource/healthView";
import HealthViewModal from "./HealthViewModal";
import "./HealthRecordTable.css";

const HealthRecordTable = ({
  healthRecords,
  userID,
  editPermission,
  viewPermission,
  deletePermission,
}) => {
  const dispatch = useDispatch();
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [healthRecordId, setCurrentHealthRecordId] = useState();
  const [healthRecord, setCurrentHealthRecord] = useState();
  const [healthView, setHealthView] = useState();

  const [healthInfoList, setHealthInfoList] = useState([]);

  const handleUpdate = (id, selectedItem) => {
    setEditModal(!editModal);
    setCurrentHealthRecordId(id);
    setCurrentHealthRecord(selectedItem);

    getEmployeeList((employeeListResult) => {
      setEmployeeList(employeeListResult);
    });
    getHealthInfoList((healthInfoListResult) => {
      setHealthInfoList(healthInfoListResult);
    });

    getHealthView(id, (onHealthView) => {
      setHealthView(onHealthView);
    });
  };

  const handleView = (id, selectedItem) => {
    setViewModal(!viewModal);
    setCurrentHealthRecordId(id);
    setCurrentHealthRecord(selectedItem);

    getEmployeeList((employeeListResult) => {
      setEmployeeList(employeeListResult);
    });
    getHealthInfoList((healthInfoListResult) => {
      setHealthInfoList(healthInfoListResult);
    });

    getHealthView(id, (onHealthView) => {
      setHealthView(onHealthView);
    });
  };

  const fields = [
    { key: "HealthID", _style: { width: "8%" } },
    { key: "EmployeeName", _style: { width: "80%" } },
    { key: "HealthInfo", _style: { width: "60%" } },
    { key: "FromDate", _style: { width: "40%" } },
    { key: "ToDate", _style: { width: "40%" } },
    { key: "Height", _style: { width: "30%" } },
    { key: "Weight", _style: { width: "30%" } },
    { key: "VisualPower", _style: { width: "40%" } },
    { key: "BloodPressure", _style: { width: "40%" } },
    { key: "MedicalClassification", _style: { width: "40%" } },
    { key: "HealthWeakness", _style: { width: "40%" } },
    "Action",
  ];
  var formData = new FormData();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to Delete?")) {
      // Save it!
      formData.append("HealthID", id);
      dispatch(deleteHealthRecord(formData, userID));
    }
  };

  return (
    <div>
      <CDataTable
        items={healthRecords}
        fields={fields}
        columnFilter
        tableFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={10}
        hover
        sorter
        striped
        pagination
        scopedSlots={{
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
                        if (editPermission === 1) {
                          handleUpdate(item.HealthID, item);
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
                          handleDelete(item.HealthID);
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <Trash className="c-icon-lg mr-3" />
                      Delete
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        if (viewPermission === 1) {
                          handleView(item.HealthID, item);
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <Eye className="c-iconmd-lg mr-3" />
                      View
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            );
          },
        }}
      />
      <HealthViewModal
        userID={userID}
        toggle={handleView}
        modal={viewModal}
        type={"Update"}
        title={"Update Health Record"}
        currentValue={healthRecordId}
        selectedItem={healthRecord}
        employeeList={employeeList}
        healthInfoList={healthInfoList}
        data={healthView}
        setData={setHealthView}
      />
      <HealthEditModal
        userID={userID}
        toggle={handleUpdate}
        modal={editModal}
        type={"Update"}
        title={"Update Health Record"}
        currentValue={healthRecordId}
        selectedItem={healthRecord}
        employeeList={employeeList}
        healthInfoList={healthInfoList}
        data={healthView}
        setData={setHealthView}
      />
    </div>
  );
};

export default HealthRecordTable;

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
import { deleteDiscipline } from "src/actions/HumanRessource/disciplines";
import DisciplineViewModal from "./DisciplineViewModal";
import DisciplineEditModal from "src/views/modules/human_ressources/disciplinemanagement/DisciplineEditModal";
import { getEmployeeList } from "src/actions/HumanRessource/employees";
import { getPunishmentList } from "src/actions/HumanRessource/punishmentList";
import { getDisciplineView } from "src/actions/HumanRessource/disciplineView";

const DisciplinesTable = ({
  disciplines,
  userID,
  editPermission,
  viewPermission,
  deletePermission,
}) => {
  const dispatch = useDispatch();
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [punishmentList, setPunishmentList] = useState([]);
  const [disciplineId, setCurrentDisciplineId] = useState();
  const [disciplineRecord, setCurrentDisciplineRecord] = useState();
  const [disciplineView, setDisciplineView] = useState();

  const handleUpdate = (id, selectedItem) => {
    setEditModal(!editModal);
    setCurrentDisciplineId(id);
    setCurrentDisciplineRecord(selectedItem);

    getEmployeeList((employeeListResult) => {
      setEmployeeList(employeeListResult);
    });

    getPunishmentList((punishmentListResult) => {
      setPunishmentList(punishmentListResult);
    });

    getDisciplineView(id, (onDisciplineView) => {
      setDisciplineView(onDisciplineView);
    });
  };

  const handleView = (id, selectedItem) => {
    setViewModal(!viewModal);
    setCurrentDisciplineId(id);
    setCurrentDisciplineRecord(selectedItem);

    getEmployeeList((employeeListResult) => {
      setEmployeeList(employeeListResult);
    });

    getPunishmentList((punishmentListResult) => {
      setPunishmentList(punishmentListResult);
    });

    getDisciplineView(id, (onDisciplineView) => {
      setDisciplineView(onDisciplineView);
    });
  };

  const fields = [
    { key: "DisciplineID", _style: { width: "40%" } },
    { key: "EmployeeName", _style: { width: "40%" } },
    { key: "OffenceDescription", _style: { width: "40%" } },
    { key: "PunishmentName", _style: { width: "40%" } },
    { key: "PunishmentMemoDate", _style: { width: "40%" } },
    { key: "PunishmentMemoN", _style: { width: "40%" } },
    { key: "Appeal", _style: { width: "40%" } },
    { key: "ReleaseMemoN", _style: { width: "40%" } },
    { key: "ReleaseMemoDate", _style: { width: "40%" } },
    "Action",
  ];
  var formData = new FormData();

  const handleDelete = (id) => {
    formData.append("DisciplineID", id);
    dispatch(deleteDiscipline(formData, userID));
  };

  return (
    <div>
      <CDataTable
        items={disciplines}
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
                          handleUpdate(item.DisciplineID, item);
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
                          handleDelete(item.DisciplineID);
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
                        if (deletePermission === 1) {
                          handleView(item.DisciplineID, item);
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

      <DisciplineViewModal
        userID={userID}
        toggle={handleView}
        modal={viewModal}
        type={"Update"}
        title={"Update Discipline"}
        currentValue={disciplineId}
        selectedItem={disciplineRecord}
        employeeList={employeeList}
        punishmentList={punishmentList}
        data={disciplineView}
        setData={setDisciplineView}
        isenableMode={true}
      />
      <DisciplineEditModal
        userID={userID}
        toggle={handleUpdate}
        modal={editModal}
        type={"Update"}
        title={"Update Discipline"}
        currentValue={disciplineId}
        selectedItem={disciplineRecord}
        employeeList={employeeList}
        punishmentList={punishmentList}
        data={disciplineView}
        setData={setDisciplineView}
        isenableMode={true}
      />
    </div>
  );
};

export default DisciplinesTable;

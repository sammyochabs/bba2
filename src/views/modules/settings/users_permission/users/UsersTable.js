import React, { useState } from "react";
import {
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Edit, Lock, Trash } from "react-feather";
import { useDispatch } from "react-redux";
import { disableUser } from "src/actions/users";
import UsersModal from "./UsersModal";

const UsersTable = ({ users, userID, editPermission, deletePermission }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [selectedItem, setSelectedItem] = useState({});
  const handleUpdate = (id, item) => {
    setModal(!modal);
    setCurrentId(id);
    setSelectedItem(item);
    console.log(item);
  };

  const fields = [
    "User ID",
    { key: "EmployeeName", _style: { width: "16%" } },
    { key: "Role", _style: { width: "16%" } },
    { key: "CreationDate", _style: { width: "16%" } },
    { key: "Blocked", _style: { width: "16%" } },
    { key: "Enable", _style: { width: "16%" } },
    { key: "Action", sorter: false, filter: false },
  ];
  var formData = new FormData();

  const handleDelete = (id) => {
    formData.append("EmployeeID", id);
    dispatch(disableUser(formData, userID));
  };

  return (
    <div>
      <CDataTable
        items={users}
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
          "User ID": (item) => <td>{item.EmployeeID}</td>,
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
                          handleUpdate(item.EmployeeID, item);
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
                          handleDelete(item.EmployeeID);
                        } else {
                          alert("you dont have permission");
                        }
                      }}
                    >
                      <Trash className="c-icon-lg mr-3" />
                      Delete
                    </CDropdownItem>
                    <CDropdownItem onClick={() => console.log("Permission")}>
                      <Lock className="c-icon-lg mr-3" />
                      Permission
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            );
          },
        }}
      />
      <UsersModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={"Update"}
        title={"Update user"}
        currentValue={currentId}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default UsersTable;

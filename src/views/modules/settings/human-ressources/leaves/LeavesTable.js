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
import { deleteLeave } from "src/actions/leaves";
import LeavesModal from "./LeavesModal";
import DeleteDialog from "src/reusable/DeleteDialog";

const LeavesTable = ({ leaves, userID, editPermission, deletePermission }) => {
  const [modal, setModal] = useState(false);
  const [delete_modal, setDeleteModal] = useState(false);
  const [leaveId, setCurrentleaveId] = useState();
  const [selectedItem, setSelectedItem] = useState({});
  const handleUpdate = (id, item) => {
    setModal(!modal);
    setCurrentleaveId(id);
    setSelectedItem(item);
  };

  const fields = [
    { key: "LEAVE_ID", _style: { width: "33%" } },
    { key: "LEAVE_TYPE", _style: { width: "33%" } },
    { key: "DAYS_PER_YEAR", _style: { width: "33%" } },
    { key: "Action", sorter: false, filter: false },
  ];

  const handleDelete = (id) => {
    setCurrentleaveId(id);
    setDeleteModal(!delete_modal);
  };

  return (
    <div>
      <CDataTable
        items={leaves}
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
                          handleUpdate(item.LEAVE_ID, item);
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
                          handleDelete(item.LEAVE_ID);
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
      <LeavesModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={"Update"}
        title={"Update leave"}
        currentValue={leaveId}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        d_modal={delete_modal}
        d_toggle={handleDelete}
        currentValue={leaveId}
        _key="leaveID"
        del_funtion={deleteLeave}
      />
    </div>
  );
};

export default LeavesTable;

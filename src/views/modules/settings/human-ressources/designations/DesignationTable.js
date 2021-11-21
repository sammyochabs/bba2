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
import { deleteDesignation } from "../../../../../actions/designation";
import DesignationModal from "./DesignationModal";
import DeleteDialog from "src/reusable/DeleteDialog";

const DesignationTable = ({
  designations,
  userID,
  editPermission,
  deletePermission,
}) => {
  const [modal, setModal] = useState(false);
  const [delete_modal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [designationId, setCurrentdesignationId] = useState();
  const handleUpdate = (id, item) => {
    setModal(!modal);
    setCurrentdesignationId(id);
    setSelectedItem(item);
  };

  const fields = [
    { key: "DESIGNATION_ID", _style: { width: "25%" } },
    { key: "DESIGNATION", _style: { width: "25%" } },
    { key: "GRADE", _style: { width: "25%" } },
    { key: "NbEmploye", _style: { width: "25%" } },
    { key: "Action", sorter: false, filter: false },
  ];

  const handleDelete = (id) => {
    setCurrentdesignationId(id);
    setDeleteModal(!delete_modal);
  };

  return (
    <div>
      <CDataTable
        items={designations}
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
                          handleUpdate(item.DESIGNATION_ID, item);
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
                          handleDelete(item.DESIGNATION_ID);
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
      <DesignationModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={"Update"}
        title={"Update designation"}
        currentValue={designationId}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        d_modal={delete_modal}
        d_toggle={handleDelete}
        currentValue={designationId}
        _key="DesignationID"
        del_funtion={deleteDesignation}
      />
    </div>
  );
};

export default DesignationTable;

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
import { deleteDocumentType } from "../../../../../actions/documentType";
import DocumentTypeModal from "./DocumentTypeModal";
import DeleteDialog from "src/reusable/DeleteDialog";

const DocumentTypeTable = ({
  documentTypes,
  userID,
  deletePermission,
  editPermission,
}) => {
  const [modal, setModal] = useState(false);
  const [delete_modal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [currentId, setCurrentId] = useState();
  const handleUpdate = (id, item) => {
    setModal(!modal);
    setCurrentId(id);
    setSelectedItem(item);
    console.log(item);
  };

  const fields = [
    { key: "DocumentTypeID", _style: { width: "33%" } },
    { key: "DocumentType", _style: { width: "33%" } },
    { key: "DocumentCategory", _style: { width: "33%" } },
    { key: "Action", sorter: false, filter: false },
  ];

  const handleDelete = (id) => {
    setCurrentId(id);
    setDeleteModal(!delete_modal);
  };

  return (
    <div>
      <CDataTable
        items={documentTypes}
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
                          handleUpdate(item.DocumentTypeID, item);
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
                          handleDelete(item.DocumentTypeID);
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
      <DocumentTypeModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={"Update"}
        title={"Update document type"}
        currentValue={currentId}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        d_modal={delete_modal}
        d_toggle={handleDelete}
        currentValue={currentId}
        _key="DocumentTypeID"
        del_funtion={deleteDocumentType}
      />
    </div>
  );
};

export default DocumentTypeTable;

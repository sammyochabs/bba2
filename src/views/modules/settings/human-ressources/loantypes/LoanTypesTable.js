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
import { deleteLoanType } from "src/actions/loantypes";
import LoanTypeModal from "src/views/modules/settings/human-ressources/loantypes/LoanTypeModal";
import DeleteDialog from "src/reusable/DeleteDialog";

const LoanTypesTable = ({
  loantypes,
  userID,
  editPermission,
  deletePermission,
}) => {
  const [modal, setModal] = useState(false);
  const [delete_modal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [loanId, setCurrentLoanId] = useState();
  const handleUpdate = (id, item) => {
    setModal(!modal);
    setCurrentLoanId(id);
    setSelectedItem(item);
  };
  const fields = [
    { key: "LOAN_ID", _style: { width: "50%" } },
    { key: "LOAN_TYPE", _style: { width: "50%" } },
    { key: "Action", sorter: false, filter: false },
  ];

  const handleDelete = (id) => {
    setCurrentLoanId(id);
    setDeleteModal(!delete_modal);
  };
  return (
    <div>
      <CDataTable
        items={loantypes}
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
                          handleUpdate(item.LOAN_ID, item);
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
                          handleDelete(item.LOAN_ID);
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
      <LoanTypeModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={"Update"}
        title={"Update loan type"}
        currentValue={loanId}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        d_modal={delete_modal}
        d_toggle={handleDelete}
        currentValue={loanId}
        _key="loanTypeID"
        del_funtion={deleteLoanType}
      />
    </div>
  );
};

export default LoanTypesTable;

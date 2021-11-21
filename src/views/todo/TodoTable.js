import React, { useState } from 'react'
import {
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CInputCheckbox,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Edit, Trash } from 'react-feather'
import { deleteLoanType as deleteTaskType } from 'src/actions/loantypes'
import DeleteDialog from 'src/reusable/DeleteDialog'
import TodoListModal from './TodoListModal'

const TodoTable = ({ todolist, userID }) => {
  const [modal, setModal] = useState(false)
  const [delete_modal, setDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [taskId, setCurrentTaskId] = useState()
  const handleUpdate = (id, item) => {
    setModal(!modal)
    setCurrentTaskId(id)
    setSelectedItem(item)
  }
  const fields = [
    { key: 'TITLE', sorter: false, filter: false, _style: { width: '20%' } },
    { key: 'DESCRIPTION', _style: { width: '20%' } },
    { key: 'DateFrom', _style: { width: '15%' } },
    { key: 'DateTo', _style: { width: '15%' } },
    { key: 'TimeFrom', sorter: false, filter: false, _style: { width: '10%' } },
    { key: 'TimeTo', sorter: false, filter: false, _style: { width: '10%' } },
    { key: 'AllDay', filter: false, _style: { width: '10%' } },
    { key: 'Action', _style: { width: '20%' } },
  ]

  const handleDelete = (id) => {
    setCurrentTaskId(id)
    setDeleteModal(!delete_modal)
  }

  const listToDosHandler = (values) => {
    if (values && values.length > 0) {
      values.forEach((value) => {
        if (value.TITLE === null) {
          value.TITLE = ''
        }
        if (value.DESCRIPTION === null) {
          value.DESCRIPTION = ''
        }
        if (value.DateFrom === null) {
          value.DateFrom = ''
        }
        if (value.DateTo === null) {
          value.DateTo = ''
        }
        if (value.TimeFrom === null) {
          value.TimeFrom = ''
        }
        if (value.TimeTo === null) {
          value.TimeTo = ''
        }
        if (value.TITLE === null) {
          value.TITLE = ''
        }
        if (value.AllDay === null) {
          value.AllDay = 1
        }
      })
      return values
    }
  }

  return (
    <div>
      <CDataTable
        items={listToDosHandler(todolist)}
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
          AllDay: (item) => {
            return (
              <td className="py-2">
                <CInputCheckbox
                  style={{ marginLeft: 5 }}
                  id={item?.allday}
                  name="allday"
                  value={item?.allday}
                  // onChange={(e) => {
                  //   handleCheckInput(e);
                  // }}
                  defaultChecked={item?.allday}
                  // checked={checkedPermission}
                />
              </td>
            )
          },
          Action: (item) => {
            return (
              <td className="py-2">
                <CDropdown className="m-1">
                  <CDropdownToggle>
                    <CIcon name={'cilSettings'} size={'lg'} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={() => handleUpdate(item.ToDoID, item)}
                    >
                      <Edit className="c-iconmd-lg mr-3" />
                      Edit
                    </CDropdownItem>
                    <CDropdownItem onClick={() => handleDelete(item.ToDoID)}>
                      <Trash className="c-icon-lg mr-3" />
                      Delete
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </td>
            )
          },
        }}
      />
      <TodoListModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={'Update'}
        title={'Update task title'}
        currentValue={taskId}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        d_modal={delete_modal}
        d_toggle={handleDelete}
        currentValue={taskId}
        _key="loanTypeID"
        del_funtion={deleteTaskType}
      />
    </div>
  )
}

export default TodoTable

import React, { useState } from 'react'
import {
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Edit, Trash, Check, X, Eye } from 'react-feather'
import { useDispatch } from 'react-redux'
import {
  approveOvertime,
  deleteOvertime,
  cancelOvertime,
} from 'src/actions/HumanRessource/empovertime'
import OvertimeModal from './OvertimeModal'

const OvertimeTable = ({ overtimes, userID, emplist, overtimestype }) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  var [overtime_selected_obj, setCurrentOvertimeRecord] = useState()
  const [currentId, setCurrentId] = useState()
  const [modal_btn, setCurrenttype] = useState('Add')
  const handleUpdate = (id, modal_btn) => {
    setModal(!modal)

    setCurrentId(id)
    setCurrenttype(modal_btn)

    if (overtimes != undefined) {
      overtime_selected_obj = overtimes.find((item) => {
        return item.EmployeeOvertimeID == id
      })
      console.log(overtime_selected_obj, 'overtime_selected_obj')
      setCurrentOvertimeRecord(overtime_selected_obj)
    }
  }
  if (overtimes != undefined) {
    overtimes.map((element, index) => {
      element.status = element.Status
    })
  }

  const fields = [
    { key: 'EmployeeOvertimeID', label: 'ID', _style: { width: '5%' } },
    { key: 'DateStatus', _style: { width: '20%' } },
    { key: 'EmployeeName', label: 'Employee Name', _style: { width: '30%' } },
    { key: 'Hours', _style: { width: '20%' } },

    { key: 'Overtime', _style: { width: '30%' } },
    { key: 'status', label: 'Status' },
    'Action',
  ]

  const getBadge = (status) => {
    console.log(status, 'status')
    switch (status) {
      case 'Approved':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'New':
        return 'warning'
      case 'Declined':
        return 'danger'
      default:
        return 'primary'
    }
  }
  var formData = new FormData()

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      formData.append('UserId', 1)
      formData.append('OvertimeID', id)
      dispatch(deleteOvertime(formData, userID))
    }
  }
  const handleApprove = (id) => {
    if (window.confirm('Are you sure?')) {
      formData.append('UserId', 1)
      formData.append('OvertimeID', id)
      dispatch(approveOvertime(formData, userID))
    }
  }
  const handleCancel = (id) => {
    if (window.confirm('Are you sure?')) {
      formData.append('UserId', 1)
      formData.append('OvertimeID', id)
      dispatch(cancelOvertime(formData, userID))
    }
  }
  return (
    <div>
      <CDataTable
        items={overtimes}
        fields={fields}
        columnFilter
        tableFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={50}
        hover
        sorter
        striped
        pagination
        scopedSlots={{
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),

          Action: (item) => {
            return (
              <td className="py-2">
                <CDropdown className="m-1">
                  <CDropdownToggle>
                    <CIcon name={'cilSettings'} size={'lg'} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      hidden={item.status != 'New'}
                      onClick={() => handleApprove(item.EmployeeOvertimeID)}
                    >
                      <Check className="c-iconmd-lg mr-3" />
                      Approve
                    </CDropdownItem>
                    <CDropdownItem
                      hidden={item.status != 'New'}
                      onClick={() => handleCancel(item.EmployeeOvertimeID)}
                    >
                      <X className="c-iconmd-lg mr-3" />
                      Decline
                    </CDropdownItem>
                    <CDropdownItem
                      hidden={item.status != 'New'}
                      onClick={() =>
                        handleUpdate(item.EmployeeOvertimeID, 'Update')
                      }
                    >
                      <Edit className="c-iconmd-lg mr-3" />
                      Edit
                    </CDropdownItem>

                    <CDropdownItem
                      onClick={() =>
                        handleUpdate(item.EmployeeOvertimeID, 'View')
                      }
                    >
                      <Edit className="c-iconmd-lg mr-3" />
                      View
                    </CDropdownItem>
                    <CDropdownItem
                      hidden={item.status != 'New'}
                      onClick={() => handleDelete(item.EmployeeOvertimeID)}
                    >
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
      <OvertimeModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={modal_btn}
        title={'Update overtime'}
        currentValue={currentId}
        emplist={emplist}
        overtimestype={overtimestype}
        overtime_selected_obj={overtime_selected_obj}
      />
    </div>
  )
}

export default OvertimeTable

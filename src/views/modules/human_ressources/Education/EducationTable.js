import React, { useState } from 'react'
import {
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Edit, Trash } from 'react-feather'
import { useDispatch } from 'react-redux'
import { deleteEducation } from 'src/actions/HumanRessource/education.services'
import EducationModal from './EducationModal'
import EducationViewModal from './educationViewModal'
const EducationTable = ({
  employeeList,
  userID,
  employeedropdown,
  reInitalizeList,
  responseModal,
  setResponseModal,
}) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [viewmodal, setViewModal] = useState(false)
  const [educationId, setCurrentEducationId] = useState()
  const [employee, setEmployee] = useState()

  const fields = [
    { key: 'Name', _style: { width: '10%' } },
    { key: 'InstitutionName', _style: { width: '40%' } },
    { key: 'principalSubject', _style: { width: '40%' } },
    { key: 'Degree', _style: { width: '30%' } },
    { key: 'passingYear', _style: { width: '40%' } },
    { key: 'educationResult', _style: { width: '20%' } },
    { key: 'Distinction', _style: { width: '20%' } },
    'Action',
  ]
  const handleUpdate = (id) => {
    let _employeeList = employeeList.filter((el) => el.EducationID == id)[0]
    setModal(!modal)
    setEmployee({
      ..._employeeList,
    })
    setCurrentEducationId(id)
    console.log(educationId)
  }

  const closeModal = () => {
    setViewModal(false)
    setModal(false)
  }

  const viewModal = (id) => {
    let _employeeList = employeeList.filter((el) => el.EducationID == id)[0]
    setViewModal(!viewmodal)
    setEmployee({
      ..._employeeList,
    })
    setCurrentEducationId(id)
  }

  const handleDelete = async (id) => {
    try {
      let deleteResp = await deleteEducation(userID, id)
      if (deleteResp.status == '200') reInitalizeList()
    } catch (error) {
      console.log(error)
    }
  }

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
          InstitutionName: (item) => <td>{item.InstitutionName}</td>,
          principalSubject: (item) => <td>{item.principalSubject}</td>,
          Degree: (item) => <td>{item.Degree}</td>,
          passingYear: (item) => <td>{item.passingYear}</td>,
          educationResult: (item) => <td>{item.educationResult}</td>,
          Distinction: (item) => <td>{item.Dstinction}</td>,
          Action: (item) => {
            return (
              <td className="py-2">
                <CDropdown className="m-1">
                  <CDropdownToggle>
                    <CIcon name={'cilSettings'} size={'lg'} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => viewModal(item.EducationID)}>
                      <Edit className="c-iconmd-lg mr-3" />
                      View
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => handleUpdate(item.EducationID)}
                    >
                      <Edit className="c-iconmd-lg mr-3" />
                      Edit
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => handleDelete(item.EducationID)}
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
      <EducationViewModal
        userID={userID}
        toggle={closeModal}
        modal={viewmodal}
        type={'Update'}
        title={'View Education'}
        currentValue={educationId}
        employeedropdown={employeedropdown}
        employee={employee}
        isEdiableName={true}
      />
      <EducationModal
        userID={userID}
        toggle={closeModal}
        modal={modal}
        type={'Update'}
        title={'Update Employee'}
        currentValue={educationId}
        employeedropdown={employeedropdown}
        employee={employee}
        isEdiableName={true}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
        reInitalizeList={reInitalizeList}
      />
    </div>
  )
}

export default EducationTable

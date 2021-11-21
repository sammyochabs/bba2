import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDesignations } from '../../../../../actions/designation'
import SettingPageTitle from '../../../../../reusable/SettingPageTitle'
import DesignationModal from './DesignationModal'
import DesignationTable from './DesignationTable'
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from 'src/services/apiCalls'
import mainNavigation from 'src/containers/_nav'

const Designation = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchDesignations(userID))
  }, [dispatch])
  const { designations } = useSelector((state) => state.designations)
  const [modal, setModal] = useState(false)
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([])
  const [programs, setPrograms] = useState({})

  const toggle = () => {
    setModal(!modal)
  }

  useEffect(() => {
    getUserProgramsPermisions(
      localStorage.getItem('userID'),
      localStorage.getItem('roleid'),
    ).then((res) => {
      setUserProgramsPermissions(res)
    })
  }, [])

  useEffect(() => {
    mainNavigation.then((res) => {
      console.log(res)
      setPrograms(res.programs)
    })
  }, [mainNavigation])

  console.log(userProgramsPermissions)
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Designations" />
        <CButton
          onClick={() => {
            if (programs && programs.designations?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle()
            } else {
              alert('You dont have this permission')
            }
          }}
          color="info"
        >
          + Add new designations
        </CButton>
      </div>
      <DesignationTable
        designations={designations}
        userID={userID}
        editPermission={programs && programs.designations?.Edit}
        deletePermission={programs && programs.designations?.Delete}
      />
      <DesignationModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new designations'}
      />
    </CCard>
  )
}

export default Designation

import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAcrClasses } from '../../../../../actions/acrClass'
import SettingPageTitle from '../../../../../reusable/SettingPageTitle'
import AcrClassModal from './AcrClassModal'
import AcrClassTable from './AcrClassTable'
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from 'src/services/apiCalls'
import mainNavigation from 'src/containers/_nav'

const Designation = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchAcrClasses(userID))
  }, [dispatch])
  const { acrClass } = useSelector((state) => state.acrClass)
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
        <SettingPageTitle title="ACRClass" />
        <CButton
          onClick={() => {
            if (programs && programs.acrClass?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle()
            } else {
              alert('You dont have this permission')
            }
          }}
          color="info"
        >
          + Add new ACRClass
        </CButton>
      </div>
      <AcrClassTable
        acrClass={acrClass}
        userID={userID}
        editPermission={programs && programs.acrClass?.Edit}
        deletePermission={programs && programs.acrClass?.Delete}
      />
      <AcrClassModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new ACRClass'}
      />
    </CCard>
  )
}

export default Designation

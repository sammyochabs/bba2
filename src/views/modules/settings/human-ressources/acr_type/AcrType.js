import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAcrType } from '../../../../../actions/acrtype'
import SettingPageTitle from '../../../../../reusable/SettingPageTitle'
import AcrTypeModal from './AcrTypeModal'
import AcrTypeTable from './AcrTypeTable'
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from 'src/services/apiCalls'
import mainNavigation from 'src/containers/_nav'

const AcrType = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchAcrType(userID))
  }, [dispatch])
  const { acrType } = useSelector((state) => state.acrType)
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
        <SettingPageTitle title="ACRType" />
        <CButton
          onClick={() => {
            if (programs && programs.acrTypes?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle()
            } else {
              alert('You dont have this permission')
            }
          }}
          color="info"
        >
          + Add new ACRType
        </CButton>
      </div>
      <AcrTypeTable
        acrType={acrType}
        userID={userID}
        editPermission={programs && programs.acrTypes?.Edit}
        deletePermission={programs && programs.acrTypes?.Delete}
      />
      <AcrTypeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new ACRType'}
      />
    </CCard>
  )
}

export default AcrType

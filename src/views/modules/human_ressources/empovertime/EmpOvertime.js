import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmpDropdown } from 'src/actions/HumanRessource/empleave'
import {
  fetchOvertimes,
  fetchOvertimesType,
} from 'src/actions/HumanRessource/empovertime'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import OvertimeModal from './OvertimeModal'
import OvertimeTable from './OvertimeTable'

const EmpOvertime = () => {
  const dispatch = useDispatch()
  const userID = 1
  useEffect(() => {
    dispatch(fetchOvertimes(userID))
    dispatch(fetchEmpDropdown(userID))
    dispatch(fetchOvertimesType(userID))
  }, [dispatch])
  const { overtimes } = useSelector((state) => {
    console.log(state.overtimes)
    return state.overtimes
  })
  const { emplist } = useSelector((state) => state.emplist)
  const { overtimestype } = useSelector((state) => state.overtimestype)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Employees Overtime" />
        <CButton onClick={toggle} color="info">
          + Add Employee Overtime
        </CButton>
      </div>
      <OvertimeTable
        overtimes={overtimes}
        userID={userID}
        emplist={emplist}
        overtimestype={overtimestype}
      />
      <OvertimeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add Employee Overtime'}
        size={'lg'}
        emplist={emplist}
        overtimestype={overtimestype}
      />
    </CCard>
  )
}

export default EmpOvertime

import { CButton, CCard } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOvertimes } from 'src/actions/overtime'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import OvertimeModal from './OvertimeModal'
import OvertimeTable from './OvertimeTable'

const Overtime = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    dispatch(fetchOvertimes(userID))
  }, [dispatch])
  const { overtimes } = useSelector((state) => state.overtimes)
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Overtime type" />
        <CButton onClick={toggle} color="info">
          + Add new overtimes
        </CButton>
      </div>
      <OvertimeTable overtimes={overtimes} userID={userID} />
      <OvertimeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={'Add'}
        title={'Add new overtime'}
      />
    </CCard>
  )
}

export default Overtime

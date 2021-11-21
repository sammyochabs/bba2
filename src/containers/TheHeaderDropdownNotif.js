import React, { useEffect } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Notification from './components/notification'
import { fetchNotifications } from 'src/actions/todolist'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const TheHeaderDropdownNotif = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem("userID"); // 1
  useEffect(() => {
    dispatch(fetchNotifications(userID))
  }, [dispatch])
  const { notificationsList } = useSelector((state) => state.todo)
  const itemsCount = notificationsList ? notificationsList.length : 0;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu
        placement="bottom-end"
        className="pt-0"
        style={{ width: '300px' }}
      >
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} notifications</strong>
        </CDropdownItem>
        <Notification notificationsList={notificationsList ? notificationsList : []} />
        <CDropdownItem header tag="div" color="light">
          <Link to="/notifications">
            <strong className="text-center">See all</strong>
          </Link>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif

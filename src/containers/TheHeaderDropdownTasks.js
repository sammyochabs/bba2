import React, { useEffect } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CListGroupItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { fetchTodoList } from 'src/actions/todolist'
import { useDispatch, useSelector } from 'react-redux'
const TheHeaderDropdownTasks = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem("userID"); // 1
  useEffect(() => {
    dispatch(fetchTodoList(userID))
  }, [dispatch])
  const { todos } = useSelector((state) => state.todo)

  // console.log("todos :: ", todos);
  const itemsCount = todos && todos.length > 0 ? todos.length : 0;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-list" />
        <CBadge shape="pill" color="warning">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0" style={{ width: '300px' }}>
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} pending tasks</strong>
        </CDropdownItem>

        <div className="w-100" style={{ maxHeight: "400px", overflow: 'auto' }}>
          <Link style={{ textDecoration: "none" }} to="#">
            {todos && todos.map(item => {
              return <CListGroupItem className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.TITLE ? item.TITLE : "N/A"}</h5>
                  <div className="text-uppercase mb-1">
                    <small className="text-muted">{item.DateFrom} {item.TimeFrom}</small> - <small className="text-muted">{item.DateTo} {item.TimeTo}</small>
                  </div>
                </div>
                <div>
                  <div className="new-notif"></div>
                </div>
              </CListGroupItem>

              // return <CDropdownItem className="d-block">
              //   <div className="small mb-1">
              //     Upgrade NPM &amp; Bower{' '}
              //     <span className="float-right">
              //       <strong>0%</strong>
              //     </span>
              //   </div>
              //   <CProgress size="xs" color="info" value={0} />
              // </CDropdownItem>
            })}
          </Link>
        </div>
        {/* <CDropdownItem className="d-block">
          <div className="small mb-1">
            ReactJS Version{' '}
            <span className="float-right">
              <strong>25%</strong>
            </span>
          </div>
          <CProgress size="xs" color="danger" value={25} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            VueJS Version{' '}
            <span className="float-right">
              <strong>50%</strong>
            </span>
          </div>
          <CProgress size="xs" color="warning" value={50} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            Add new layouts{' '}
            <span className="float-right">
              <strong>75%</strong>
            </span>
          </div>
          <CProgress size="xs" color="info" value={75} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            Angular 2 Cli Version{' '}
            <span className="float-right">
              <strong>100%</strong>
            </span>
          </div>
          <CProgress size="xs" color="success" value={100} />
        </CDropdownItem> */}
        <CDropdownItem className="text-center border-top">
          <Link to="/todo">
            <strong>View all tasks</strong>
          </Link>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownTasks

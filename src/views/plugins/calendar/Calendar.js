import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { fetchTodoList } from 'src/actions/todolist'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment)

const currDate = new Date()
const currYear = currDate.getFullYear()
const currMonth = currDate.getMonth()
// todo: reactive custom calendar toolbar component
const Calendar = () => {
  const itemsCount = 5
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID"); // 1
  useEffect(() => {
    dispatch(fetchTodoList(userID))
  }, [dispatch])
  const { todos } = useSelector((state) => state.todo)
  const events = todos && todos.length > 0 ? todos.map(item => {
    let currStartDate = new Date(moment(item.DateFrom).format('DD/MM/YYYY'))
    let currEndDate = new Date(moment(item.DateTo).format('DD/MM/YYYY'))
    let startTimeSlot = item.TimeFrom ? item.TimeFrom.split(":") : [0, 0]
    let endTimeSlot = item.TimeTo ? item.TimeTo.split(":") : [0, 0]
    return {
      title: item.TITLE,
      allDay: item.AllDay,
      start: new Date(currStartDate.getFullYear(), currStartDate.getMonth(), currStartDate.getDate(), startTimeSlot[0], startTimeSlot[1], 0, 0),
      end: new Date(currEndDate.getFullYear(), currEndDate.getMonth(), currEndDate.getDate(), endTimeSlot[0], endTimeSlot[1], 0, 0),
      desc: item.DESCRIPTION,
    }
  }) : [];
  return (
    <CCard>
      <CCardHeader>
        <CIcon name="cil-calendar" /> Calendar
          <Link to="/todo" style={{ float: 'right' }}>
            <strong>+ Add todo</strong>
          </Link>
        {/* <ProBadge /> */}
      </CCardHeader>
      <CCardBody style={{ height: '40rem' }}>
        <BigCalendar
          className="c-d-sm-down-none"
          events={events}
          views={['day', 'week', , 'month']}
          defaultDate={new Date(currYear, currMonth, 1)}
          localizer={localizer}
        />
      </CCardBody>
    </CCard>
  )
}

export default Calendar

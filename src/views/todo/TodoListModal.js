import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CDropdownToggle,
  CIcon,
  CBadge,
  CModal,
  CInputCheckbox,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker'
import { checkBeforeUpdate } from 'src/actions/global'
import { addTodo, updateTodo } from 'src/actions/todolist'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { number, string } from 'prop-types'

const TodoListModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  selectedItem,
}) => {
  const [data, setData] = useState(selectedItem)
  const dispatch = useDispatch()
  var formData = new FormData()

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    return console.log(data)
  }

  const handleDateInput = (value, e) => {
    setData({ ...data, [e]: value })
    return console.log(data)
  }

  const handleCheckInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked })
    return console.log(data)
  }

  const handleSubmit = (e, type) => {
    data['userid'] = userID
    switch (type) {
      case 'Add':
        //formData.append('ToDoList', data)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append(
          'datefrom',
          moment(data.datefrom || '').format('DD/MM/YYYY'),
        )
        formData.append(
          'dateto',
          moment(data.dateto || '').format('DD/MM/YYYY'),
        )
        formData.append('timefrom', moment(data.timefrom || '').format('HH:MM'))
        formData.append('timeto', moment(data.timeto || '').format('HH:MM'))
        formData.append('allday', (data.allday ? true : 1, 1))
        //formData.append("datefrom", data.datefrom);
        dispatch(addTodo(formData, userID))
        toggle()
        break
      case 'Update':
        formData.append('ToDoID', currentValue)
        formData.append(
          'ToDoList',
          checkBeforeUpdate(data, selectedItem?.TITLE),
        )
        dispatch(updateTodo(formData, userID))
        toggle()
        break

      default:
        break
    }
  }
  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <form onSubmit={handleSubmit}>
              <CFormGroup>
                <CLabel htmlFor="nf-task">
                  Title <span style={{ color: 'red' }}>*</span>
                </CLabel>
                <input
                  type="text"
                  id="nf-task"
                  name="title"
                  placeholder="Enter Task Body.."
                  onChange={handleInput}
                  className="form-control"
                  defaultValue={data?.title}
                  required={true}
                />
                <CLabel htmlFor="nf-task">Description</CLabel>
                <input
                  type="text"
                  id="nf-task"
                  name="description"
                  placeholder="Description"
                  onChange={handleInput}
                  className="form-control"
                  defaultValue={data?.description}
                  required={true}
                />
                <CLabel htmlFor="nf-task">Date From</CLabel>
                <DatePicker
                  name="datefrom"
                  selected={data?.datefrom}
                  //   value={
                  //     leave_selected_obj != undefined
                  //       ? leave_selected_obj.FromDate
                  //       : { fromDate }
                  //   }
                  className="p-0 col-12"
                  dateFormat="dd/MM/yyyy"
                  onChange={(value) => handleDateInput(value, 'datefrom')}
                  placeholder="From Date"
                  defaultValue={data?.datefrom}
                />
                <CLabel htmlFor="nf-task">Date To</CLabel>
                <DatePicker
                  name="dateto"
                  selected={data?.dateto}
                  //   value={
                  //     leave_selected_obj != undefined
                  //       ? leave_selected_obj.FromDate
                  //       : { fromDate }
                  //   }
                  className="p-0 col-12"
                  dateFormat="dd/MM/yyyy"
                  onChange={(value) => handleDateInput(value, 'dateto')}
                  placeholder="To Date"
                  defaultValue={data?.dateto}
                />
                <CLabel htmlFor="nf-task">Time From</CLabel>
                <DatePicker
                  name="timefrom"
                  selected={data?.timefrom}
                  //   value={
                  //     leave_selected_obj != undefined
                  //       ? leave_selected_obj.FromDate
                  //       : { fromDate }
                  //   }
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  className="p-0 col-12"
                  dateFormat="h:mm aa"
                  onChange={(value) => handleDateInput(value, 'timefrom')}
                  placeholder="To Date"
                  defaultValue={data?.timefrom}
                />
                <CLabel htmlFor="nf-task">Time To</CLabel>
                <DatePicker
                  name="timeTo"
                  selected={data?.timeto}
                  //   value={
                  //     leave_selected_obj != undefined
                  //       ? leave_selected_obj.FromDate
                  //       : { fromDate }
                  //   }
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  className="p-0 col-12"
                  dateFormat="h:mm aa"
                  onChange={(value) => handleDateInput(value, 'timeto')}
                  placeholder="To Date"
                  defaultValue={data?.timeto}
                />
                <div style={{ flexDirection: 'row', marginTop: 5 }}>
                  <CInputCheckbox
                    style={{ marginLeft: 5 }}
                    id={data?.allday}
                    name="allday"
                    value={data?.allday}
                    onChange={(e) => {
                      handleCheckInput(e)
                    }}
                    defaultChecked={data?.allday}
                    // checked={checkedPermission}
                  />
                  <CLabel style={{ marginLeft: 30 }} htmlFor="nf-task">
                    All Day
                  </CLabel>
                </div>

                {/* <CFormCheck type="checkbox" id="gridCheck" label="Check me out"/> */}
              </CFormGroup>
            </form>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={(e) => handleSubmit(e, type)}>
          {type}
        </CButton>{' '}
        <CButton color="secondary" onClick={toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default TodoListModal

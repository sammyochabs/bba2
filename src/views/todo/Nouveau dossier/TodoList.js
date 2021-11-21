import { CCard, CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodoList } from 'src/actions/todolist'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import TodoTable from './TodoTable'
import ToDoListModal from './TodoListModal'

const TodoList = () => {
  const dispatch = useDispatch()
  const userID = 1
  useEffect(() => {
    debugger
    dispatch(fetchTodoList(userID))
  }, [dispatch])
  const [{ ToDoList }, setTodos] = useState('')
  //const { ToDoList } = useSelector((state) => state.ToDoList)
  setTodos(useSelector((state) => state.todos))
  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }
  return (
    <div>
      <CCard className="p-3">
        <div className="hr-header">
          <SettingPageTitle title="Todo List" />
          <CButton onClick={toggle} color="info">
            + Add new todo
          </CButton>
        </div>
        <TodoTable todolist={ToDoList} userID={userID} />
        <ToDoListModal
          userID={userID}
          toggle={toggle}
          modal={modal}
          type={'Add'}
          title={'Add new ToDo'}
        />
      </CCard>
    </div>
  )
}

export default TodoList

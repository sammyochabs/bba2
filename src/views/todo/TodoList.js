import { CCard, CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import { useDispatch, useSelector } from "react-redux";
import TodoTable from "./TodoTable";
import { fetchTodoList } from "src/actions/todolist";
import ToDoListModal from "./TodoListModal";

const TodoList = () => {
  const toggle = () => {
    setModal(!modal);
  };
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const userID = 1;
  useEffect(() => {
    dispatch(fetchTodoList(userID));
  }, [dispatch]);

  const { todos } = useSelector((state) => state.todo);

  return (
    <div>
      <CCard className="p-3">
        <div className="hr-header">
          <SettingPageTitle title="Todo List" />
          <CButton onClick={toggle} color="info">
            + Add new todo
          </CButton>
        </div>
        <TodoTable todolist={todos} userID={userID} />
        <ToDoListModal
          userID={userID}
          toggle={toggle}
          modal={modal}
          type={"Add"}
          title={"Add new ToDo"}
        />
      </CCard>
    </div>
  );
};

export default TodoList;

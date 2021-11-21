import { CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import { useDispatch, useSelector } from "react-redux";
import NotificationsTable from "./notificationsTable";
import { fetchTodoList } from "src/actions/todolist";

const AllNotifications = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID"); // 1;
  useEffect(() => {
    dispatch(fetchTodoList(userID));
  }, [dispatch]);

  const { notificationsList } = useSelector((state) => state.todo);

  return (
    <div>
      <CCard className="p-5">
        <div className="hr-header">
          <SettingPageTitle title="Notifications" />
        </div>
        <NotificationsTable notificationsList={notificationsList} userID={userID} />
      </CCard>
    </div>
  );
};

export default AllNotifications;

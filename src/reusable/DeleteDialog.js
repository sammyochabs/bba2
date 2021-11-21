import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteDialog = ({
  d_modal,
  d_toggle,
  _key,
  currentValue,
  del_funtion,
}) => {
  const dispatch = useDispatch();
  var formData = new FormData();

  const handleDelete = () => {
    formData.append(_key, currentValue);
    dispatch(del_funtion(formData, 1));
    d_toggle();
  };
  return (
    <CModal show={d_modal} onClose={d_toggle} centered>
      <CModalHeader closeButton>Delete</CModalHeader>
      <CModalBody>
        <h4>Are you sure you want to delete this item ?</h4>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={handleDelete}>
          Delete
        </CButton>{" "}
        <CButton color="secondary" onClick={d_toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteDialog;

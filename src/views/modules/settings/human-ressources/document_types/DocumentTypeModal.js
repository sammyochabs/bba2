import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSelect,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkBeforeUpdate, setActiveOption } from "src/actions/global";
import {
  addDocumentType,
  updateDocumentType,
} from "../../../../../actions/documentType";

const DocumentTypeModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  selectedItem,
}) => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  var formData = new FormData();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    return console.log(data);
  };

  const handleSubmit = (e, type) => {
    switch (type) {
      case "Add":
        formData.append("DocumentType", data.document_type);
        formData.append("DocumentCategory", data.document_category);
        dispatch(addDocumentType(formData, userID));
        toggle();
        break;
      case "Update":
        formData.append("DocumentTypeID", currentValue);
        formData.append(
          "DocumentType",
          checkBeforeUpdate(data.document_type, selectedItem?.DocumentType)
        );
        formData.append(
          "DocumentCategory",
          checkBeforeUpdate(
            data.document_category,
            selectedItem?.DocumentCategory
          )
        );
        dispatch(updateDocumentType(formData, userID));
        toggle();
        break;

      default:
        break;
    }
  };
  const options = ["Employee", "Project", "Vehicle", "Client"];
  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <CForm onSubmit={handleSubmit}>
              <CFormGroup>
                <CLabel htmlFor="nf-grade">Document type</CLabel>

                <CInput
                  className="p-0 col-12"
                  type="text"
                  name="document_type"
                  onChange={handleInput}
                  defaultValue={selectedItem?.DocumentType}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-grade">Document</CLabel>
                <CSelect custom name="document_category" onChange={handleInput}>
                  {options.map((option, index) => (
                    <option
                      key={index}
                      value={option}
                      selected={setActiveOption(
                        option,
                        selectedItem?.DocumentCategory
                      )}
                    >
                      {option}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={(e) => handleSubmit(e, type)}>
          {type}
        </CButton>{" "}
        <CButton color="secondary" onClick={toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DocumentTypeModal;

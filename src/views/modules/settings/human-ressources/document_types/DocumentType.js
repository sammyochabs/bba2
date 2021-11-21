import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocumentType } from "../../../../../actions/documentType";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import DocumentTypeModal from "./DocumentTypeModal";
import DocumentTypeTable from "./DocumentTypeTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const DocumentType = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchDocumentType(userID));
  }, [dispatch]);
  const { documentTypes } = useSelector((state) => state.documentTypes);
  const [modal, setModal] = useState(false);
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([]);
  const [programs, setPrograms] = useState({});

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getUserProgramsPermisions(
      localStorage.getItem("userID"),
      localStorage.getItem("roleid")
    ).then((res) => {
      setUserProgramsPermissions(res);
    });
  }, []);

  useEffect(() => {
    mainNavigation.then((res) => {
      console.log(res);
      setPrograms(res.programs);
    });
  }, [mainNavigation]);

  console.log(userProgramsPermissions);
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Document type" />
        <CButton
          onClick={() => {
            if (programs && programs.documentTypes?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new document type
        </CButton>
      </div>
      <DocumentTypeTable
        documentTypes={documentTypes}
        userID={userID}
        editPermission={programs && programs.documentTypes?.Edit}
        deletePermission={programs && programs.documentTypes?.Delete}
      />
      <DocumentTypeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new document types"}
      />
    </CCard>
  );
};

export default DocumentType;

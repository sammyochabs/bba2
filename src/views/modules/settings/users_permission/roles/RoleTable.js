import React, { useState } from "react";
import { CListGroup, CListGroupItem } from "@coreui/react";
import { Edit, Link, Trash } from "react-feather";
import { deleteRole } from "src/actions/role";
import RoleModal from "./RoleModal";
import DeleteDialog from "src/reusable/DeleteDialog";

const RoleTable = ({ roles, userID, selectedRole }) => {
  const [modal, setModal] = useState(false);
  const [delete_modal, setDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [selectedItem, setSelectedItem] = useState({});
  const handleUpdate = (id, item) => {
    setModal(!modal);
    setCurrentId(id);
    setSelectedItem(item);
  };

  const handleDelete = (id) => {
    setCurrentId(id);
    setDeleteModal(!delete_modal);
  };

  return (
    <div>
      <CListGroup>
        {roles.map((role) => (
          <CListGroupItem className="d-flex justify-content-between">
            <strong>{role.Role}</strong>
            <div>
              <Edit
                style={{ cursor: "pointer" }}
                className="c-iconmd-lg mr-3"
                onClick={() => handleUpdate(role.RoleID, role)}
              />
              <Trash
                style={{ cursor: "pointer" }}
                className="c-iconmd-lg mr-3"
                onClick={() => handleDelete(role.RoleID)}
              />
              <Link
                style={{ cursor: "pointer" }}
                className="c-iconmd-lg mr-3"
                onClick={() => selectedRole(role)}
              />
            </div>
          </CListGroupItem>
        ))}
      </CListGroup>

      <RoleModal
        userID={userID}
        toggle={handleUpdate}
        modal={modal}
        type={"Update"}
        title={"Update Role"}
        currentValue={currentId}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        d_modal={delete_modal}
        d_toggle={handleDelete}
        currentValue={currentId}
        _key="RoleID"
        del_funtion={deleteRole}
      />
    </div>
  );
};

export default RoleTable;

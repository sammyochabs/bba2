import { CListGroupItem } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <div className="w-100">
      <Link style={{ textDecoration: "none" }} to="#">
        <CListGroupItem className="d-flex justify-content-between align-items-center">
          <div>
            <h5>New Notofication</h5>
            <div className="text-uppercase mb-1">
              <small className="text-muted">21/10/2021 - 11:20</small>
            </div>
          </div>
          <div>
            <div className="new-notif"></div>
          </div>
        </CListGroupItem>
      </Link>
    </div>
  );
};

export default Notification;

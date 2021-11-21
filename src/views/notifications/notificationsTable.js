import React from "react";
import {
    CDataTable
} from "@coreui/react";


const NotificationsTable = ({ notificationsList, userID }) => {
    const fields = [
        { label: "Title", key: "title", sorter: false, filter: false, _style: { width: "20%" } },
        { label: "Message", key: "message", _style: { width: "20%" } },
        { label: "RECEIVED FROM", key: "From", _style: { width: "10%" } },
        { label: "Date", key: "datenotif", _style: { width: "15%" } },
        { label: "TIME", key: "timenotif", sorter: false, filter: false, _style: { width: "10%" } },
    ];

    const listNotificHandler = (values) => {
        if (values && values.length > 0) {
            values.forEach((value) => {
                console.log("value test<; ", value)
                if (value.title === null) {
                    value.title = 'N/A';
                }
                if (value.message === null) {
                    value.message = 'N/A';
                }
                if (value.datenotif === null) {
                    value.datenotif = 'N/A';
                }
                if (value.timenotif === null) {
                    value.timenotif = 'N/A';
                }
                if (value.From === null) {
                    value.From = 'N/A';
                }
            });
            return values;
        }
    }

    return (
        <div>
            <CDataTable
                items={listNotificHandler(notificationsList)}
                fields={fields}
                columnFilter
                tableFilter
                cleaner
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                striped
                pagination
            />
        </div>
    );
};

export default NotificationsTable;

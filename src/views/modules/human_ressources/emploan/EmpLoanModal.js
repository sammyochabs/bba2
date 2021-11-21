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
  CTextarea,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmpLoan, updateEmpLoan } from "src/actions/HumanRessource/emploan";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EmpLoanModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  emplist,
  loantypes,
  loanfunds,
  loan_selected_obj,
}) => {
  const [data, setData] = useState({});
  const [sactionDate, setSactionDate] = useState(new Date());
  const [terimationDate, setTerminationDate] = useState(new Date());
  const [paidDate, setPaidDate] = useState(new Date());
  const dispatch = useDispatch();
  var formData = new FormData();
  console.log(type, "type");
  if (type == "Update") {
  }
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (type == "Update") {
      loan_selected_obj.EmployeeID =
        e.target.name == "empid"
          ? e.target.value
          : loan_selected_obj.EmployeeID;

      loan_selected_obj.LoanTypeID =
        e.target.name == "LoanTypeID"
          ? e.target.value
          : loan_selected_obj.LoanTypeID;

      loan_selected_obj.LoanFundsID =
        e.target.name == "LoanFundsID"
          ? e.target.value
          : loan_selected_obj.LoanFundsID;

      loan_selected_obj.SanctionDate = formatDate(sactionDate);

      loan_selected_obj.Memo =
        e.target.name == "Memo" ? e.target.value : loan_selected_obj.Memo;

      loan_selected_obj.LoanAmount =
        e.target.name == "LoanAmount"
          ? e.target.value
          : loan_selected_obj.LoanAmount;

      loan_selected_obj.LoanAmountWord =
        e.target.name == "LoanAmountWord"
          ? e.target.value
          : loan_selected_obj.LoanAmountWord;

      loan_selected_obj.NumberMonth =
        e.target.name == "NumberMonth"
          ? e.target.value
          : loan_selected_obj.NumberMonth;

      loan_selected_obj.Installment =
        e.target.name == "Installment"
          ? e.target.value
          : loan_selected_obj.Installment;

      loan_selected_obj.TerminateDate = formatDate(terimationDate);

      loan_selected_obj.EmployeeMemo =
        e.target.name == "EmployeeMemo"
          ? e.target.value
          : loan_selected_obj.EmployeeMemo;
    }
    return console.log(data);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month?.length < 2) month = "0" + month;
    if (day?.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }
  const handleSubmit = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "Add":
        formData.append("UserID", localStorage.getItem("userID"));
        formData.append("EmployeeID", data.empid);
        formData.append("LoanTypeID", data.LoanTypeID);
        formData.append("LoanFundsID", data.LoanFundsID);
        //
        formData.append("SanctionDate", formatDate(sactionDate));
        formData.append("Memo", data.Memo);
        formData.append("LoanAmount", data.LoanAmount);
        formData.append("LoanAmountWord", data.LoanAmountWord);
        formData.append("NumberMonth", data.NumberMonth);
        formData.append("Installment", data.Installment);
        formData.append("TerminateDate", formatDate(terimationDate));
        formData.append("EmployeeMemo", data.EmployeeMemo);
        dispatch(addEmpLoan(formData, userID));
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        break;
      case "Update":
        console.log(loan_selected_obj, "loan_selected_obj");
        formData.append("UserID", localStorage.getItem("userID"));
        formData.append("EmployeeID", loan_selected_obj.EmployeeID);
        formData.append("LoanID", currentValue);
        formData.append("LoanTypeID", loan_selected_obj.LoanTypeID);
        formData.append("LoanFundsID", loan_selected_obj.LoanFundsID);
        formData.append("SanctionDate", formatDate(sactionDate));
        formData.append("Memo", loan_selected_obj.Memo);
        formData.append("LoanAmount", loan_selected_obj.LoanAmount);
        formData.append("LoanAmountWord", loan_selected_obj.LoanAmountWord);
        formData.append("NumberMonth", loan_selected_obj.NumberMonth);
        formData.append("Installment", loan_selected_obj.Installment);
        formData.append("TerminateDate", formatDate(terimationDate));
        formData.append("EmployeeMemo", loan_selected_obj.EmployeeMemo);
        dispatch(updateEmpLoan(formData, localStorage.getItem("userID")));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;

      default:
        break;
    }
  };
  return (
    <CModal show={modal} onClose={toggle} size={"xl"} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md="6">
              <CFormGroup>
                <CLabel htmlFor="nf-grade">Employee Name</CLabel>
                {emplist?.length === 1 ? (
                  <CSelect
                    value={emplist[0]?.NameEnglish}
                    name="empid"
                    onChange={handleInput}
                    aria-label="Default select example"
                  >
                    {/* <option> Please select </option> */}
                    {
                      <option value={emplist[0].EmployeeID}>
                        {emplist[0]?.NameEnglish}
                      </option>
                    }
                    {/* {emplist != undefined
                    ? emplist.map((team) => (
                        <option value={team.EmployeeID}>{team.Name}</option>
                      ))
                    : data.empid} */}
                  </CSelect>
                ) : (
                  <CSelect
                    value={
                      loan_selected_obj
                        ? loan_selected_obj.EmployeeID
                        : data.empid
                    }
                    name="empid"
                    onChange={handleInput}
                    aria-label="Default select example"
                  >
                    <option> Please select </option>
                    {emplist != undefined
                      ? emplist.map((team) => (
                          <option value={team.EmployeeID}>{team.Name}</option>
                        ))
                      : data.empid}
                  </CSelect>
                )}
              </CFormGroup>
            </CCol>

            <CCol md="6">
              <CLabel htmlFor="nf-grade">Sanction Date</CLabel>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={sactionDate}
                className="p-0 col-12"
                placeholder="Saction Date"
                name="SanctionDate"
                onChange={(sactionDate) => setSactionDate(sactionDate)}
                required
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Loan Type</CLabel>
              <CSelect
                value={
                  loan_selected_obj
                    ? loan_selected_obj.LoanTypeID
                    : data.LoanTypeID
                }
                name="LoanTypeID"
                onChange={handleInput}
                aria-label="Default select example"
              >
                <option>Select Loan Type</option>
                {loantypes != undefined
                  ? loantypes.map((team) => (
                      <option value={team.LOAN_ID}>{team.LOAN_TYPE}</option>
                    ))
                  : data.LoanTypeID}
              </CSelect>
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Source of Fund</CLabel>
              <CSelect
                value={
                  loan_selected_obj
                    ? loan_selected_obj.LoanFundsID
                    : data.LoanFundsID
                }
                name="LoanFundsID"
                onChange={handleInput}
                aria-label="Default select example"
              >
                <option>Select Source of Fund</option>
                {loanfunds != undefined
                  ? loanfunds.map((team) => (
                      <option value={team.LOAN_FUNDS_ID}>
                        {team.LOAN_FUNDS}
                      </option>
                    ))
                  : data.LoanFundsID}
              </CSelect>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CRow>
                <CCol md="12">
                  <CLabel htmlFor="nf-grade">Total Loan Amount</CLabel>
                  <CInput
                    value={
                      loan_selected_obj
                        ? loan_selected_obj.LoanAmount
                        : data.LoanAmount
                    }
                    className="p-0 col-12"
                    type="number"
                    placeholder="Total Loan Amount"
                    name="LoanAmount"
                    onChange={handleInput}
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CLabel htmlFor="nf-grade">Loan Amount in Words</CLabel>
                  <CInput
                    value={
                      loan_selected_obj
                        ? loan_selected_obj.LoanAmountWord
                        : data.LoanAmountWord
                    }
                    className="p-0 col-12"
                    type="text"
                    placeholder="loan Amount in Words"
                    name="LoanAmountWord"
                    onChange={handleInput}
                    required
                  />
                </CCol>
              </CRow>
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Memo</CLabel>
              <CTextarea
                value={loan_selected_obj ? loan_selected_obj.MEMO : data.Memo}
                name="Memo"
                onChange={handleInput}
                size="lg"
                placeholder="Enter Memo"
              ></CTextarea>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Number Month</CLabel>
              <CInput
                value={
                  loan_selected_obj
                    ? loan_selected_obj.NumberMonth
                    : data.NumberMonth
                }
                className="p-0 col-12"
                type="number"
                placeholder="Number Month"
                name="NumberMonth"
                onChange={handleInput}
                required
              />
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Installment </CLabel>
              <CInput
                value={
                  loan_selected_obj
                    ? loan_selected_obj.Installment
                    : data.Installment
                }
                className="p-0 col-12"
                type="number"
                placeholder="Installment"
                name="Installment"
                onChange={handleInput}
                required
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Loan Termination Date</CLabel>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                onChange={(terimationDate) =>
                  setTerminationDate(terimationDate)
                }
                selected={terimationDate}
                className="p-0 col-12"
                placeholder="Loan Termination Date"
                name="TerminateDate"
                required
              />
            </CCol>
            <CCol md="6">
              {/* <CLabel htmlFor="nf-grade">Paid Amount</CLabel>
              <CInput
                value={
                  loan_selected_obj
                    ? loan_selected_obj.Installment
                    : data.Installment
                }
                className="p-0 col-12"
                type="text"
                placeholder="Paid Amount"
                name="paidamount"
                onChange={handleInput}
                required
              /> */}
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Paid Date</CLabel>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                onChange={(paidDate) => setPaidDate(paidDate)}
                selected={paidDate}
                className="p-0 col-12"
                placeholder="Paid Date"
                name="paiddate"
                required
              />
            </CCol>
            {/* <CCol md="6">
              <CLabel htmlFor="nf-grade">Status</CLabel>
              <CSelect
                name="empname"
                onChange={handleInput}
                aria-label="Default select example"
              >
                <option>Select Status</option>
                <option value="new">New</option>
              </CSelect>
            </CCol> */}
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel htmlFor="nf-grade">Comments Employee</CLabel>
              <CTextarea
                value={
                  loan_selected_obj
                    ? loan_selected_obj.EmployeeMemo
                    : data.EmployeeMemo
                }
                name="EmployeeMemo"
                onChange={handleInput}
                size="lg"
                placeholder="Comments Employee"
              ></CTextarea>
            </CCol>
          </CRow>
          {/* <CRow>
            <CCol md="12">
              <CLabel htmlFor="nf-grade">Comments Manager</CLabel>
              <CTextarea
                value={
                  loan_selected_obj ? loan_selected_obj.MEMO : data.EmployeeMemo
                }
                name="comments"
                onChange={handleInput}
                size="lg"
                placeholder="Comments Employee"
              ></CTextarea>
            </CCol>
          </CRow> */}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          hidden={type == "View"}
          color="info"
          onClick={(e) => handleSubmit(e, type)}
        >
          {type}
        </CButton>{" "}
        <CButton color="secondary" onClick={toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EmpLoanModal;

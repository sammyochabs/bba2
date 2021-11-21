import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CSelect,
  CTabPane,
} from '@coreui/react'
import { useSelector } from 'react-redux'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
//import DatePicker from 'react-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'

const JobTab = ({
  handleInput,
  data,
  errors,
  handleInputJoiningDate,
  handleInputConfirmationDate,
  handleInputLRPDate,
}) => {
  const { designations } = useSelector((state) => state.designations)
  const { departments } = useSelector((state) => state.departments)

  const renderDesignations = designations.map((des) => {
    return (
      <option defaultValue value={des.DESIGNATION_ID} key={des.DESIGNATION_ID}>
        {des.DESIGNATION}
      </option>
    )
  })
  const renderDepartments = departments.map((dep) => {
    return (
      <option defaultValue value={dep.DEPARTEMENT_ID} key={dep.DEPARTEMENT_ID}>
        {dep.DEPARTEMENT}
      </option>
    )
  })
  return (
    <CTabPane>
      <CCard>
        <CCardHeader>
          <SettingPageTitle title="Job" />
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Desingation</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  name="job_designation"
                  value={data?.job_designation}
                  id="select"
                  onChange={handleInput}
                  required
                >
                  <option>Please select option</option>
                  {renderDesignations}
                </CSelect>
                <p className="text-danger">{errors?.job_designation}</p>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Department</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  name="job_department"
                  value={data?.job_department}
                  id="select"
                  onChange={handleInput}
                  required
                >
                  <option>Please select option</option>
                  {renderDepartments}
                </CSelect>
                <p className="text-danger">{errors?.job_department}</p>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">Cadre</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="text"
                  id="hf-email"
                  name="job_cadre"
                  value={data?.job_cadre}
                  placeholder="Cadre"
                  autoComplete="email"
                  required
                />
                <p className="text-danger">{errors?.job_cadre}</p>
                <CFormText className="help-block"></CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">Email Adress</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="email"
                  id="hf-email"
                  name="job_email"
                  value={data?.job_email}
                  placeholder="Enter Email..."
                  autoComplete="email"
                  required
                />
                <p className="text-danger">{errors?.job_email}</p>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="phone-input">Phone</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="number"
                  id="text-input"
                  name="job_phone"
                  value={data?.job_phone}
                  placeholder="Phone"
                  required
                />
                <p className="text-danger">{errors?.job_phone}</p>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Joining Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="date"
                  id="date-input"
                  name="job_joining_date"
                  value={data?.job_joining_date}
                  placeholder="date"
                  required
                />
                {/* <DatePicker
                  dateFormat="dd/MM/yyyy"
                  //selected={birthDate}
                  className="p-0 col-12"
                  placeholder="Joining Date"
                  name="job_joining_date"
                  id="date-input"
                  onChange={handleInputJoiningDate} //{(birthDate) => setBirthDate(birthDate)}
                  value={data?.job_joining_date}
                  required
                /> */}
                <p className="text-danger">{errors?.job_joining_date}</p>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">LRP Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="date"
                  id="date-input"
                  name="job_lrp_date"
                  value={data?.job_lrp_date}
                  placeholder="date"
                  required
                />
                {/* <DatePicker
                  dateFormat="dd/MM/yyyy"
                  //selected={birthDate}
                  className="p-0 col-12"
                  placeholder="LRP Date"
                  name="job_lrp_date"
                  id="date-input"
                  onChange={handleInputLRPDate} //{(birthDate) => setBirthDate(birthDate)}
                  value={data?.job_lrp_date}
                  required
                /> */}
                <p className="text-danger">{errors?.job_lrp_date}</p>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Date of Confirmation</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="date"
                  id="date-input"
                  name="job_confirmation_date"
                  value={data?.job_confirmation_date}
                  placeholder="date"
                  required
                />
                {/* <DatePicker
                  dateFormat="dd/MM/yyyy"
                  //selected={birthDate}
                  className="p-0 col-12"
                  placeholder="Confirmation Date"
                  name="job_confirmation_date"
                  id="date-input"
                  onChange={handleInputConfirmationDate} //{(birthDate) => setBirthDate(birthDate)}
                  value={data?.job_confirmation_date}
                  required
                /> */}
                <p className="text-danger">{errors?.job_confirmation_date}</p>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CTabPane>
  )
}

export default JobTab

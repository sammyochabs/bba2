import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CRow,
  CTabPane,
} from '@coreui/react'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
//import DatePicker from 'react-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'

const EmployeeTab = ({
  handleInput,
  handleFile,
  data,
  errors,
  handleInputBirthDate,
  birthDate,
}) => {
  // const [birthDate, setBirthDate] = useState()
  return (
    <CTabPane>
      <CCard>
        <CCardHeader>
          <SettingPageTitle title="Employee" />
        </CCardHeader>
        <CCardBody>
          <CForm encType="multipart/form-data" className="form-horizontal">
            {/*  */}
            <CFormGroup row>
              <CCol md="10">
                <CRow className="mb-3">
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Registration number</CLabel>
                  </CCol>
                  <CCol xs="12" md="8" style={{ marginLeft: '40px' }}>
                    <CInput
                      onChange={handleInput}
                      //type="text"
                      id="text-input"
                      name="employee_registration_number"
                      value={data?.employee_registration_number}
                      placeholder="Registration number"
                      required
                    />
                    <p className="text-danger">
                      {errors?.employee_registration_number}
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Card ID</CLabel>
                  </CCol>
                  <CCol xs="12" md="8" style={{ marginLeft: '40px' }}>
                    <CInput
                      onChange={handleInput}
                      id="text-input"
                      name="employee_card_id"
                      value={data?.employee_card_id}
                      placeholder="Card ID"
                      required
                    />
                    <p className="text-danger">{errors?.employee_card_id}</p>
                  </CCol>
                </CRow>
              </CCol>

              <CCol md="2" style={{ height: '100px' }}>
                <CCol xs="12" md="12">
                  <div
                    className="custom-file-input-wrapper"
                    style={{ float: 'right' }}
                  >
                    <span>Upload photo</span>
                    {data?.employee_photo && (
                      <img
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: '100%',
                        }}
                        src={data?.employee_photo}
                      />
                    )}
                    <CInputFile
                      className="custom-file-input"
                      id="file-input"
                      name="employee_photo"
                      onChange={handleFile}
                      required
                    />
                  </div>
                </CCol>
              </CCol>
            </CFormGroup>
            {/*  */}

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Name (English)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  id="text-input"
                  name="employee_name_english"
                  value={data?.employee_name_english}
                  placeholder="Employee Name (english)"
                  required
                />
                <p className="text-danger">{errors?.employee_name_english}</p>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Name (Bangla)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  id="text-input"
                  name="employee_name_bangla"
                  value={data?.employee_name_bangla}
                  placeholder="Employee Name (bangla)"
                  required
                />
                <p className="text-danger">{errors?.employee_name_bangla}</p>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Father's Name (English)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  id="text-input"
                  name="employee_fathers_name_english"
                  value={data?.employee_fathers_name_english}
                  placeholder="Father's Name (english)"
                  required
                />
                <p className="text-danger">
                  {errors?.employee_fathers_name_english}
                </p>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Father's Name (Bangla)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  id="text-input"
                  name="employee_fathers_name_bangla"
                  value={data?.employee_fathers_name_bangla}
                  placeholder="Father's Name (Bangla)"
                  required
                />
                <p className="text-danger">
                  {errors?.employee_fathers_name_bangla}
                </p>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Mother's Name (English)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  id="text-input"
                  name="employee_mothers_name_english"
                  value={data?.employee_mothers_name_english}
                  placeholder="Mother's Name (English)"
                  required
                />
                <p className="text-danger">
                  {errors?.employee_mothers_name_english}
                </p>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Mother's Name (Bangla)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  id="text-input"
                  name="employee_mothers_name_bangla"
                  value={data?.employee_mothers_name_bangla}
                  placeholder="Mother's Name (Bangla)"
                  required
                />
                <p className="text-danger">
                  {errors?.employee_mothers_name_bangla}
                </p>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Mobile</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="number"
                  id="text-input"
                  name="employee_mobile_number"
                  value={data?.employee_mobile_number}
                  placeholder="Mobile number"
                  required
                />
                <p className="text-danger">{errors?.employee_mobile_number}</p>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Date of Birth</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  onChange={handleInput}
                  type="date"
                  formt
                  id="date-input"
                  name="employee_date_of_birth"
                  value={data?.employee_date_of_birth}
                  placeholder="date"
                  required
                />
                {/* <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  //showMonthYearDropdown="true"
                  //selected={birthDate}
                  className="p-0 col-12"
                  placeholder="Date of Birth"
                  name="employee_date_of_birth"
                  id="date-input"
                  onChange={handleInputBirthDate} //{(birthDate) => setBirthDate(birthDate)}
                  value={data?.employee_date_of_birth}
                  required
                /> */}
                <p className="text-danger">{errors?.employee_date_of_birth}</p>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CTabPane>
  )
}

export default EmployeeTab

import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CInvalidFeedback,
  CLabel,
  CRow,
  CTabPane,
} from "@coreui/react";
import SettingPageTitle from "src/reusable/SettingPageTitle";
// import { Formik } from 'formik'
// import * as Yup from 'yup'

// const validationSchema = function (values) {
//   return Yup.object().shape({
//     employee_registration_number: Yup.string()
//       //.min(2, `First name has to be at least 2 characters`)
//       .required('Registration Number  is required'),
//     employee_card_id: Yup.string()
//       .min(10, `Card ID has to be at least 10 character`)
//       .required('Card ID is required'),
//     employee_name_english: Yup.string()
//       .min(5, `Username has to be at least 5 characters`)
//       .required('Name is required'),
//     employee_name_bagla: Yup.string()
//       .min(5, `Username has to be at least 5 characters`)
//       .required('Name is required'),
//     employee_date_of_birth: Yup.string().required('Date of birth is required'),
//     job_email: Yup.string()
//       .email('Invalid email address')
//       .required('Email is required!'),
//   })
// }

// const validate = (getValidationSchema) => {
//   return (values) => {
//     const validationSchema = getValidationSchema(values)
//     try {
//       validationSchema.validateSync(values, { abortEarly: false })
//       return {}
//     } catch (error) {
//       return getErrorsFromValidationError(error)
//     }
//   }
// }
// const onSubmit = (values, { setSubmitting, setErrors }) => {
//   setTimeout(() => {
//     alert(JSON.stringify(values, null, 2))
//     // console.log('User has been successfully saved!', values)
//     setSubmitting(false)
//   }, 2000)
// }

// const findFirstError = (formName, hasError) => {
//   const form = document.forms[formName]
//   for (let i = 0; i < form?.length; i++) {
//     if (hasError(form[i].name)) {
//       form[i].focus()
//       break
//     }
//   }
// }

// const touchAll = (setTouched, errors) => {
//   setTouched({
//     employee_registration_number: true,
//     employee_card_id: true,
//     employee_name_english: true,
//   })
//   validateForm(errors)
// }
// const initialValues = {
//   employee_card_id: '',
//   employee_date_of_birth: '',
//   employee_name_bagla: '',
//   employee_name_english: '',
//   employee_registration_number: '',
//   employee_fathers_name_english: '',
//   employee_fathers_name_bangala: '',
// }
// const validateForm = (errors) => {
//   findFirstError('simpleForm', (fieldName) => {
//     return Boolean(errors[fieldName])
//   })
// }
// const getErrorsFromValidationError = (validationError) => {
//   const FIRST_ERROR = 0
//   return validationError.inner.reduce((errors, error) => {
//     return {
//       ...errors,
//       [error.path]: error.errors[FIRST_ERROR],
//     }
//   }, {})
// }
const EmployeeTab = ({ handleInput, handleFile }) => {
  return (
    <CTabPane>
      <CCard>
        <CCardHeader>
          <SettingPageTitle title="Employee" />
        </CCardHeader>
        <CCardBody>
          {/* <Formik
            initialValues={initialValues}
            validate={validate(validationSchema)}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              status,
              dirty,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              handleReset,
              setTouched,
            }) => ( */}
          <CForm
            encType="multipart/form-data"
            noValidate
            name="simpleForm"
            className="form-horizontal"
          >
            {/*  */}
            <CFormGroup row>
              <CCol md="10">
                <CRow className="mb-3">
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Registration number</CLabel>
                  </CCol>
                  <CCol xs="12" md="8" style={{ marginLeft: "40px" }}>
                    <CInput
                      onChange={handleInput}
                      type="number"
                      id="text-input"
                      name="employee_registration_number"
                      placeholder="Registration number"
                      required
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Card ID</CLabel>
                  </CCol>
                  <CCol xs="12" md="8" style={{ marginLeft: "40px" }}>
                    <CInput
                      onChange={handleInput}
                      id="text-input"
                      name="employee_card_id"
                      placeholder="Card ID"
                      // valid={!errors.employee_card_id}
                      // invalid={
                      //   touched.employee_card_id && !!errors.employee_card_id
                      // }
                      required
                    />
                    {/* <CInvalidFeedback>
                      {errors.employee_registration_number}
                    </CInvalidFeedback> */}
                  </CCol>
                </CRow>
              </CCol>

              <CCol md="2" style={{ height: "100px" }}>
                <CCol xs="12" md="12">
                  <div
                    className="custom-file-input-wrapper"
                    style={{ float: "right" }}
                  >
                    <span>Upload photo</span>
                    <CInputFile
                      className="custom-file-input"
                      id="file-input"
                      name="employee_photo"
                      onChange={handleFile}
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
                  placeholder="Employee Name (english)"
                />
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
                  placeholder="Employee Name (bangla)"
                />
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
                  placeholder="Father's Name (english)"
                />
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
                  placeholder="Father's Name (Bangla)"
                />
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
                  placeholder="Mother's Name (English)"
                />
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
                  placeholder="Mother's Name (Bangla)"
                />
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
                  placeholder="Mobile number"
                />
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
                  id="date-input"
                  name="employee_date_of_birth"
                  placeholder="date"
                />
              </CCol>
            </CFormGroup>
          </CForm>
          {/* )}
          </Formik> */}
        </CCardBody>
      </CCard>
    </CTabPane>
  );
};

export default EmployeeTab;

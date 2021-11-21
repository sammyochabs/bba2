import React from "react";
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
  CRow,
  CSelect,
  CTabPane,
} from "@coreui/react";
import { useSelector } from "react-redux";
import SettingPageTitle from "src/reusable/SettingPageTitle";

const AdressTab = ({ handleInput }) => {
  const { districts } = useSelector((state) => state.districts);
  const renderDistricts = districts.map((dis) => {
    return (
      <option defaultValue value={dis.DISTRICT_ID} key={dis.DISTRICT_ID}>
        {dis.DISTRICT}
      </option>
    );
  });
  return (
    <CTabPane>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              <SettingPageTitle title="Present Adress" />
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Village/House N°. Road</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="present_adress_village_house"
                      placeholder="Adress"
                      autoComplete="vilage"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Post Office</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="present_adress_post_office"
                      placeholder="Post office "
                      autoComplete="post"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Upazila</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="present_adress_upazila"
                      placeholder="Upazila"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">District</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      onChange={handleInput}
                      custom
                      name="present_adress_district"
                      id="select"
                    >
                      <option>Please select district</option>
                      {renderDistricts}
                    </CSelect>
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              <SettingPageTitle title="Permanent Adress" />
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Village/House N°. Road</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="permanent_adress_village_house"
                      placeholder="Adress"
                      autoComplete="vilage"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Post Office</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="permanent_adress_post_office"
                      placeholder="Post office "
                      autoComplete="post"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Upazila</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="permanent_adress_upazila"
                      placeholder="Upazila"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">District</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      onChange={handleInput}
                      custom
                      name="permanent_adress_district"
                      id="select"
                    >
                      <option>Please select district</option>
                      {renderDistricts}
                    </CSelect>
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              <SettingPageTitle title="Official Adress" />
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Village/House N°. Road</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="official_adress_village_house"
                      placeholder="Adress"
                      autoComplete="vilage"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Post Office</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="official_adress_post_office"
                      placeholder="Post office "
                      autoComplete="post"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">Upazila</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      onChange={handleInput}
                      type="text"
                      id="hf-text"
                      name="official_adress_upazila"
                      placeholder="Upazila"
                    />
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-text">District</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      onChange={handleInput}
                      custom
                      name="official_adress_district"
                      id="select"
                    >
                      <option>Please select district</option>
                      {renderDistricts}
                    </CSelect>
                    <CFormText className="help-block"></CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CTabPane>
  );
};

export default AdressTab;

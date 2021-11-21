import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetBrand, CRow, CCol } from '@coreui/react'
import ChartLineSimple from '../charts/ChartLineSimple'

const WidgetsBrand = ({ withCharts, admin, adminData, employeeData }) => {
  // render

  return withCharts ? (
    <CRow>
      {!admin ? (
        <>
          <CCol sm="6" lg="3">
            <CWidgetBrand
              color="facebook"
              rightFooter="Approved"
              rightHeader={
                admin ? adminData?.LoanApproved : employeeData?.LoanApproved
              }
              leftFooter="Cancelled"
              leftHeader={
                admin ? adminData?.LoanCanceled : employeeData?.LoanCanceled
              }
            >
              <div style={{ minHeight: '80px' }} className="my-4 text-white">
                <center>
                  <span style={{ fontSize: 35 }}>
                    {admin ? adminData?.Loan : employeeData?.Loan}
                  </span>
                </center>
                <h3 style={{ color: '#f3f3f3' }}>Loan</h3>
              </div>
              <ChartLineSimple
                className="position-absolute w-100 h-100"
                backgroundColor="rgba(255,255,255,.1)"
                dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                label="Friends"
                labels="months"
              />
            </CWidgetBrand>
          </CCol>

          <CCol sm="6" lg="3">
            <CWidgetBrand
              color="twitter"
              rightFooter="Approved"
              rightHeader={
                admin ? adminData?.LeaveApproved : employeeData?.LeaveApproved
              }
              leftFooter="Canceled"
              leftHeader={
                admin ? adminData?.LeaveCanceled : employeeData?.LeaveCanceled
              }
            >
              <div style={{ minHeight: '80px' }} className="my-4 text-white">
                <center>
                  <span style={{ fontSize: 35 }}>
                    {admin ? adminData?.Leave : employeeData?.Leave}
                  </span>
                </center>
                <h3 style={{ color: '#f3f3f3' }}>Leave</h3>
              </div>

              <ChartLineSimple
                className="position-absolute w-100 h-100"
                backgroundColor="rgba(255,255,255,.1)"
                dataPoints={[1, 13, 9, 17, 34, 41, 38]}
                label="Followers"
                labels="months"
              />
            </CWidgetBrand>
          </CCol>

          {/* <CCol sm="6" lg="3">
            <CWidgetBrand
              color="linkedin"
              rightHeader={
                admin
                  ? adminData?.OverTimeApproved
                  : employeeData?.OverTimeApproved
              }
              rightFooter="Approved"
              leftHeader={
                admin
                  ? adminData?.OverTimeCanceled
                  : employeeData?.OverTimeCanceled
              }
              leftFooter="Cancelled"
            >
              <div style={{ minHeight: '80px' }} className="my-4 text-white">
                <center>
                  <span style={{ fontSize: 35 }}>
                    {admin ? adminData?.OverTime : employeeData?.OverTime}
                  </span>
                </center>
                <h3 style={{ color: '#f3f3f3' }}>Over Time</h3>
              </div>

              <ChartLineSimple
                className="position-absolute w-100 h-100"
                backgroundColor="rgba(255,255,255,.1)"
                dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                label="Contracts"
                labels="months"
              />
            </CWidgetBrand>
          </CCol>*/}

          <CCol sm="6" lg="3">
            <CWidgetBrand
              rightHeader={
                admin ? adminData?.Promotion : employeeData?.Promotion
              }
              rightFooter="Promotions"
              leftHeader={admin ? adminData?.Charge : employeeData?.Charge}
              leftFooter="Charged"
              color="gradient-warning"
            >
              <div style={{ minHeight: '80px' }} className="my-4 text-white">
                <h3 style={{ color: '#f3f3f3' }}>Promotions</h3>
              </div>
              <ChartLineSimple
                className="position-absolute w-100 h-100"
                backgroundColor="rgba(255,255,255,.1)"
                dataPoints={[35, 23, 56, 22, 97, 23, 64]}
                label="Followers"
                labels="months"
              />
            </CWidgetBrand>
          </CCol>

          {admin ? (
            <CCol sm="6" lg="3">
              <CWidgetBrand
                rightHeader={adminData?.Discipline}
                rightFooter="Punishment"
                leftHeader={adminData?.DisciplineReleased}
                leftFooter="Released"
                color="gradient-warning"
              >
                <div style={{ minHeight: '80px' }} className="my-4 text-white">
                  <h3 style={{ color: '#f3f3f3', alignSelf: 'center' }}>
                    Disciplines
                  </h3>
                </div>
                <ChartLineSimple
                  className="position-absolute w-100 h-100"
                  backgroundColor="rgba(255,255,255,.1)"
                  dataPoints={[35, 23, 56, 22, 97, 23, 64]}
                  label="Followers"
                  labels="months"
                />
              </CWidgetBrand>
            </CCol>
          ) : null}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <CCol sm="6" lg="3">
              <CWidgetBrand
                color="facebook"
                rightFooter="Approved"
                rightHeader={
                  admin ? adminData?.LoanApproved : employeeData?.LoanApproved
                }
                leftFooter="Cancelled"
                leftHeader={
                  admin ? adminData?.LoanCanceled : employeeData?.LoanCanceled
                }
              >
                <div style={{ minHeight: '80px' }} className="my-4 text-white">
                  <center>
                    <span style={{ fontSize: 35 }}>
                      {admin ? adminData?.Loan : employeeData?.Loan}
                    </span>
                  </center>
                  <h3 style={{ color: '#f3f3f3' }}>Loan</h3>
                </div>
                <ChartLineSimple
                  className="position-absolute w-100 h-100"
                  backgroundColor="rgba(255,255,255,.1)"
                  dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                  label="Friends"
                  labels="months"
                />
              </CWidgetBrand>
            </CCol>

            <CCol sm="6" lg="3">
              <CWidgetBrand
                color="twitter"
                rightFooter="Approved"
                rightHeader={
                  admin ? adminData?.LeaveApproved : employeeData?.LeaveApproved
                }
                leftFooter="Canceled"
                leftHeader={
                  admin ? adminData?.LeaveCanceled : employeeData?.LeaveCanceled
                }
              >
                <div style={{ minHeight: '80px' }} className="my-4 text-white">
                  <center>
                    <span style={{ fontSize: 35 }}>
                      {admin ? adminData?.Leave : employeeData?.Leave}
                    </span>
                  </center>
                  <h3 style={{ color: '#f3f3f3' }}>Leave</h3>
                </div>

                <ChartLineSimple
                  className="position-absolute w-100 h-100"
                  backgroundColor="rgba(255,255,255,.1)"
                  dataPoints={[1, 13, 9, 17, 34, 41, 38]}
                  label="Followers"
                  labels="months"
                />
              </CWidgetBrand>
            </CCol>

            {/*<CCol sm="6" lg="3">
              <CWidgetBrand
                color="linkedin"
                rightHeader={
                  admin
                    ? adminData?.OverTimeApproved
                    : employeeData?.OverTimeApproved
                }
                rightFooter="Approved"
                leftHeader={
                  admin
                    ? adminData?.OverTimeCanceled
                    : employeeData?.OverTimeCanceled
                }
                leftFooter="Cancelled"
              >
                <div style={{ minHeight: '80px' }} className="my-4 text-white">
                  <center>
                    <span style={{ fontSize: 35 }}>
                      {admin ? adminData?.OverTime : employeeData?.OverTime}
                    </span>
                  </center>
                  <h3 style={{ color: '#f3f3f3' }}>Over Time</h3>
                </div>

                <ChartLineSimple
                  className="position-absolute w-100 h-100"
                  backgroundColor="rgba(255,255,255,.1)"
                  dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                  label="Contracts"
                  labels="months"
                />
              </CWidgetBrand>
            </CCol>*/}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <CCol sm="6" lg="3">
              <CWidgetBrand
                rightHeader={
                  admin ? adminData?.Promotion : employeeData?.Promotion
                }
                rightFooter="Promotions"
                leftHeader={admin ? adminData?.Charge : employeeData?.Charge}
                leftFooter="Charged"
                color="gradient-warning"
              >
                <div style={{ minHeight: '80px' }} className="my-4 text-white">
                  <h3 style={{ color: '#f3f3f3' }}>Promotions</h3>
                </div>
                <ChartLineSimple
                  className="position-absolute w-100 h-100"
                  backgroundColor="rgba(255,255,255,.1)"
                  dataPoints={[35, 23, 56, 22, 97, 23, 64]}
                  label="Followers"
                  labels="months"
                />
              </CWidgetBrand>
            </CCol>

            {admin ? (
              <CCol sm="6" lg="3">
                <CWidgetBrand
                  rightHeader={adminData?.Discipline}
                  rightFooter="Punishment"
                  leftHeader={adminData?.DisciplineReleased}
                  leftFooter="Released"
                  color="gradient-warning"
                >
                  <div
                    style={{ minHeight: '80px' }}
                    className="my-4 text-white"
                  >
                    <h3 style={{ color: '#f3f3f3', alignSelf: 'center' }}>
                      Disciplines
                    </h3>
                  </div>
                  <ChartLineSimple
                    className="position-absolute w-100 h-100"
                    backgroundColor="rgba(255,255,255,.1)"
                    dataPoints={[35, 23, 56, 22, 97, 23, 64]}
                    label="Followers"
                    labels="months"
                  />
                </CWidgetBrand>
              </CCol>
            ) : null}
          </div>
        </div>
      )}
    </CRow>
  ) : (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="facebook"
          rightFooter="Approved"
          rightHeader={
            admin ? adminData?.LoanApproved : employeeData?.LoanApproved
          }
          leftFooter="Cancelled"
          leftHeader={
            admin ? adminData?.LoanCanceled : employeeData?.LoanCanceled
          }
        >
          <div style={{ minHeight: '80px' }} className="my-4 text-white">
            <center>
              <span style={{ fontSize: 35 }}>
                {admin ? adminData?.Loan : employeeData?.Loan}
              </span>
            </center>
            <h3 style={{ color: '#f3f3f3' }}>Loan</h3>
          </div>
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="twitter"
          rightFooter="Approved"
          rightHeader={
            admin ? adminData?.LeaveApproved : employeeData?.LeaveApproved
          }
          leftFooter="Canceled"
          leftHeader={
            admin ? adminData?.LeaveCanceled : employeeData?.LeaveCanceled
          }
        >
          <div style={{ minHeight: '80px' }} className="my-4 text-white">
            <center>
              <span style={{ fontSize: 35 }}>
                {admin ? adminData?.Leave : employeeData?.Leave}
              </span>
            </center>
            <h3 style={{ color: '#f3f3f3' }}>Leave</h3>
          </div>
        </CWidgetBrand>
      </CCol>

      {/* <CCol sm="6" lg="3">
      <CWidgetBrand
        color="linkedin"
        rightHeader={admin ? adminData?.OverTimeApproved : employeeData?.OverTimeApproved}
        rightFooter="Approved"
        leftHeader= {admin ? adminData?.OverTimeCanceled : employeeData?.OverTimeCanceled}
        leftFooter="Cancelled"
      >
         <div style={{ minHeight: '80px' }} className="my-4 text-white">
              <center>
                <span style={{ fontSize: 35 }}>
                  {admin ? adminData?.OverTime : employeeData?.OverTime}
                </span>
              </center>
              <h3 style={{ color: '#f3f3f3' }}>Over Time</h3>
            </div>
        
      </CWidgetBrand>
    </CCol> */}

      <CCol sm="6" lg="3">
        <CWidgetBrand
          rightHeader={admin ? adminData?.Promotion : employeeData?.Promotion}
          rightFooter="Promotions"
          leftHeader={admin ? adminData?.Charge : employeeData?.Charge}
          leftFooter="Charged"
          color="gradient-warning"
        >
          <div style={{ minHeight: '80px' }} className="my-4 text-white">
            <h3 style={{ color: '#f3f3f3' }}>Promotions</h3>
          </div>
        </CWidgetBrand>
      </CCol>

      {admin ? (
        <CCol sm="6" lg="3">
          <CWidgetBrand
            rightHeader={adminData?.Discipline}
            rightFooter="Punishment"
            leftHeader={adminData?.DisciplineReleased}
            leftFooter="Eeleased"
            color="gradient-warning"
          >
            <div style={{ minHeight: '80px' }} className="my-4 text-white">
              <h3 style={{ color: '#f3f3f3', alignSelf: 'center' }}>
                Disciplines
              </h3>
            </div>
          </CWidgetBrand>
        </CCol>
      ) : null}
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
  admin: PropTypes.bool,
  adminData: PropTypes.object,
  employeeData: PropTypes.object,
}

export default WidgetsBrand

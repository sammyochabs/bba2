import { CCard } from '@coreui/react'
import React from 'react'
import SettingPageTitle from 'src/reusable/SettingPageTitle'
import Avatar from 'src/assets/images/bba-logo.png'
//const { user } = useSelector((state) => state.employee)
const Profile = () => {
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Profile" />
      </div>
      <div className="d-flex mt-5">
        <div className="mr-3">
          <img
            src={Avatar}
            alt="avatar"
            width="150px"
            className="profile-avatar"
          />
        </div>
        <div className="row col-md-12">
          <div
            className="col-md-5 mr-2"
            style={{ borderRight: '2px dashed #ddd' }}
          >
            <h3>John Doe</h3>
            <ul className="profile-list-info">
              <li className="text-muted mb-2">Ui/Ux Designer</li>
              <li className="text-muted mb-2">Employee ID : CF-412</li>
              <li className="text-muted mb-2">
                Date of Join : <strong>21/10/2021</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-5">
            <ul className="profile-list-info">
              <li className="mb-2">
                <div>
                  <strong>Phone:</strong>
                </div>
                <span className="text-muted">123 456 789</span>
              </li>
              <li className="mb-2">
                <div>
                  <strong>Email:</strong>
                </div>
                <span className="text-muted">JohnDoe@bba.com</span>
              </li>
              <li className="mb-2">
                <div>
                  <strong>Gender:</strong>
                </div>
                <span className="text-muted">Male</span>
              </li>
              <li className="mb-2">
                <div>
                  <strong>BirthDate:</strong>
                </div>
                <span className="text-muted">--/--/--</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CCard>
  )
}

export default Profile

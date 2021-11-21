import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useHistory } from "react-router-dom";
import { BrowserRouter, useHistory, Redirect, Route } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import BbaLogo from 'src/assets/bba-logo'
import {
  LoginCheck,
  getPermissionOnRolesHandler,
} from 'src/actions/HumanRessource/login'
import { fetchProgramPermissions } from 'src/actions/role'
import userKeyGenerator from 'src/actions/userKeyGenerator'
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from 'src/services/apiCalls'
import { GetterFunction } from 'src/containers/_nav'
//import { getToken } from 'src/firebase'
const Login = () => {
  const [permissions, setPermissions] = useState([])
  const [data, setData] = useState({})
  const [response, setResponse] = useState('')
  const dispatch = useDispatch()
  var formData = new FormData()
  // let history = useHistory();
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    return console.log(data)
  }

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    formData = new FormData()
    formData.append('userID', data.userID)
    formData.append('password', userKeyGenerator(data.passWord))
    // Token genertion
    // var FirebaseTokenGenerator = require("firebase-token-generator");
    // var tokenGenerator = new FirebaseTokenGenerator(
    //   "AIzaSyACpcwOh1a6J8JRxpYubwc44TCV9iKGXZ4"
    // );
    // var token = tokenGenerator.createToken({
    //   uid: data.userID,
    //   some: "admin",
    //   data: "admin",
    // });
    var token = '11' //await getToken()

    console.log(token, 'token')
    formData.append('Token', token)
    LoginCheck(formData).then(
      (response) => {
        console.log(response, 'response')
        if (response?.status != '200') {
          alert(response?.status + ' ' + response?.message)
        } else {
          localStorage.setItem('roleid', response?.roleid)
          localStorage.setItem('keyAPP', response?.key)
          localStorage.setItem('userName', response?.username)
          localStorage.setItem('userID', data.userID)
          getUserPermissions(
            localStorage.getItem('userID'),
            localStorage.getItem('roleid'),
          ).then((res) => {
            console.log(res)
            // localStorage.setItem("userPermissions", JSON.stringify(res));
          })
          getUserProgramsPermisions(
            localStorage.getItem('userID'),
            localStorage.getItem('roleid'),
          ).then((res) => {
            console.log(res)
            // localStorage.setItem(
            //   "userProgramsPermissions",
            //   JSON.stringify(res)
            // );
            setPermissions(res)
            history.push({
              pathname: '/modules',
              state: {
                userID: data.userID,
                roleid: response?.roleid,
              },
            })
          })
          // window.location = "/#/modules";
          //setkeyApp(localStorage.getItem("keyAPP"))
          // const [keyApp, setkeyApp] = useState()
          // const [userID, setUserID] = useState()
          // const [userName, setUserName] = useState()

          //return <Redirect to="/#/modules" />
          // history.push('/#/modules', {
          //   state: {
          //     userID: formData.userID,
          //     userName: response?.username,
          //     KeyAPP: response?.key,
          //   },
          // })
        }
      },
      (error) => console.log(error),
    )

    //dispatch(login(formData))

    //setData({})
    //toggle(null)
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center align-items-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    {/* <GetterFunction
                      setUserProgramsPermissions={setUserProgramsPermissions}
                      userProgramsPermissions={userProgramsPermissions}
                    /> */}
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        name="userID"
                        placeholder="Username"
                        autoComplete="username"
                        onChange={handleInput}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        name="passWord"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleInput}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        {/* <Link to="/modules"> */}
                        <CButton
                          type="submit"
                          color="info"
                          active
                          tabIndex={-1}
                        >
                          Login
                        </CButton>
                        {/* </Link> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-info py-5 d-md-down-none"
                style={{ width: '44%' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <BbaLogo size={150} />
                    <h2 className="mt-3">Bangladesh Bridge Authority</h2>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

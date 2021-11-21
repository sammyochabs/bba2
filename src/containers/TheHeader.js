import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import mainNavigation from 'src/containers/_nav'

// routes config
import routes from '../routes'

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from './index'
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from 'src/services/apiCalls'

const TheHeader = () => {
  const dispatch = useDispatch()
  const { asideShow, darkMode, sidebarShow } = useSelector(
    (state) => state.theme,
  )
  const [programs, setPrograms] = useState({})
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([])

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow)
      ? false
      : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow)
      ? true
      : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  useEffect(() => {
    getUserProgramsPermisions(
      localStorage.getItem('userID'),
      localStorage.getItem('roleid'),
    ).then((res) => {
      setUserProgramsPermissions(res)
    })
  }, [])

  useEffect(() => {
    mainNavigation.then((res) => {
      console.log(res)
      setPrograms(res.programs)
    })
  }, [mainNavigation])

  console.log(programs)

  return (
    <CHeader withSubheader className="master-page-header">
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      {/* <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand> */}

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/modules">Master Page</CHeaderNavLink>
        </CHeaderNavItem>
        {/* <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem> */}
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none c-d-legacy-none"
          onClick={() => dispatch({ type: 'set', darkMode: !darkMode })}
          title="Toggle Light/Dark Mode"
        >
          <CIcon
            name="cil-moon"
            className="c-d-dark-none"
            alt="CoreUI Icons Moon"
          />
          <CIcon
            name="cil-sun"
            className="c-d-default-none"
            alt="CoreUI Icons Sun"
          />
        </CToggler>

        {/* <CDropdown className="m-1">
          <CDropdownToggle>
            Select language
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem >
              <CIcon name="" size={'lg'} className="mr-3"/>
              Bengali
            </CDropdownItem>
            <CDropdownItem >
              <CIcon name="cif-us" size={'lg'} className="mr-3"/>
              English
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown> */}

        <TheHeaderDropdownNotif />
        <TheHeaderDropdownTasks />
        {/* <TheHeaderDropdownMssg /> */}
        <TheHeaderDropdown />
        <CToggler
          inHeader
          className="d-md-down-none"
          // onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
          onClick={() => {
            if (programs && programs.dashboardAdmin?.Permission === 1) {
              localStorage.setItem('currentModule', 'Settings')
              window.location = '/#/dashboard'
            } else {
              alert('you dont have access')
            }
          }}
        >
          <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
        </CToggler>
      </CHeaderNav>

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />
            &nbsp;Settings
          </CLink>
        </div>
      </CSubheader> */}
    </CHeader>
  )
}

export default TheHeader

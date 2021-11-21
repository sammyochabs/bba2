import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              )
            })}
            <Route
              path="/test-out"
              component={() => {
                window.open('http://192.168.3.7:8081/ ', '_blank')
                return null
              }}
            />
            <Route
              path="/account"
              component={() => {
                window.open('http://192.168.3.7:8081/af/', '_blank')
                return null
              }}
            />
            <Route
              path="/estate"
              component={() => {
                window.open('http://192.168.3.16:8099', '_blank')
                return null
              }}
            />

            <Redirect from="/" to="/login" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)

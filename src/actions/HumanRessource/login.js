import apiClient from "src/services/api";
import { apiLogin } from "src/services/apiLogin";
//
export const LoginCheck = (formData) => {
  return apiLogin
    .post("/auth/login", formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

// export const login = (formData) => {
//   return (dispatch) => {
//     for (var [key, value] of formData.entries()) {
//       console.log(key, value)
//     }
//     //  dispatch(fetchGetRequest());
//     //const history = useHistory()
//     //
//     apiClient
//       .post('/auth/login', formData, { 'Content-Type': 'multipart/form-data' })
//       .then((res) => {
//         return res.data
//       })
//       .catch((err) => {
//         console.error(err)
//       })

//     {
//       /*.then((res) => {
//         if (res.data.status != '200') {
//           alert(res.data.status + ' ' + res.data.message)
//         }
//         //
//         if (res.data.status == '200') {
//           console.log(res.data, 'res.data')
//           let history = useHistory()
//           // navigation.navigate('/modules', { userName: res.data.username })
//           //window.location.href = '/#/modules'
//           //  ;<Switch>
//           //    <Route
//           //      exact
//           //      path="/#/modules"
//           //      name="Modules"
//           //     //render={(props) => <App.MasterPage {...props} />}
//           //   />
//           // </Switch>
//           // history.push('/#/modules', {
//           //   state: {
//           //     user: res.data.username,
//           //   },
//           // })
//           // this.context.history.push('/modules', {
//           //   state: {
//           //     user: res.data.username,
//           //   },
//           // })
//           //return <Redirect to="/#/modules" />
//           history.push('/#/modules', {
//             state: {
//               userID: formData.userID,
//               userName: res.data.username,
//             },
//           })
//         }
//       })
//       .catch((err) => {
//         console.error(err, 'errrrrr')
//       })*/
//     }
//   }
// }

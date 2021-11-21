export const isAuth = () => {
  if (localStorage.getItem('userID')) {
    return true
  } else {
    return false
  }
}
export const keyAPP = () => {
  if (localStorage.getItem('keyAPP')) {
    //console.log(localStorage.getItem('keyAPP'))
    return localStorage.getItem('keyAPP')
  } else {
    return ''
  }
}
export const userName = () => {
  if (localStorage.getItem('userName')) {
    return localStorage.getItem('userName')
  } else {
    return ''
  }
}

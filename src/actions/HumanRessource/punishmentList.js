import apiClient from 'src/services/api'

export const getPunishmentList = (onPunishmentListResult) => {
  apiClient
    .get('/PunishmentType/List', {
      params: { userID: localStorage.getItem('userID') },
    })
    .then((res) => {
      const punishmentList = res.data.PunishmentTypeList
      onPunishmentListResult(punishmentList)
    })
    .catch((err) => {
      console.error(err)
    })
}

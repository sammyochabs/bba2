import apiClient from 'src/services/api'

export const getHealthView = (HealthId, onHealthView) => {
  apiClient
    .get('/Health/View', {
      params: { userID: localStorage.getItem('userID'), HealthID: HealthId },
    })
    .then((res) => {
      const healthView = res.data.HealthView
      onHealthView(healthView)
    })
    .catch((err) => {
      console.error(err)
    })
}

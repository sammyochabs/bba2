import apiClient from 'src/services/api'

export const getDisciplineView = (DisciplineID, onDisciplineView) => {
  apiClient
    .get('/Discipline/View', {
      params: {
        userID: localStorage.getItem('userID'),
        DisciplineID: DisciplineID,
      },
    })
    .then((res) => {
      const disciplineView = res.data.DisciplineView
      onDisciplineView(disciplineView)
    })
    .catch((err) => {
      console.error(err)
    })
}

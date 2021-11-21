import { combineReducers } from 'redux'
import acrClassReducer from './acrClass'
import acrTypeReducer from './acrtype'
import departmentReducer from './department'
import designationReducer from './designation'
import districtReducer from './district'
import documentTypeReducer from './documentType'
import gradesReducer from './grades'
import healthInfosReducer from './healthinfo'
import leavesReducer from './leaves'
import loanFundsReducer from './loanfunds'
import loantypesReducer from './loantypes'
import overtimeReducer from './overtime'
import punishmentReducer from './punishment'
import roleReducer from './role'
import changeState from './themes'
import usersReducer from './users'
import moduleReducer from './module'
import employeeReducer from './employee'
import childrenReducer from './children'
import healthRecordReducer from './healthRecords'
import disciplineReducer from './disciplines'
import overtimesReducer from './empovertime'
import empLoanReducer from './emploan'
import empleaveReducer from './empleave'
import emplistReducer from './emplist'
import todolistReducer from './todolist'
const Reducers = combineReducers({
  // human ressources reducers
  loantype: loantypesReducer,
  grades: gradesReducer,
  leaves: leavesReducer,
  loanfunds: loanFundsReducer,
  districts: districtReducer,
  designations: designationReducer,
  departments: departmentReducer,
  punishments: punishmentReducer,
  acrClass: acrClassReducer,
  acrType: acrTypeReducer,
  healthInfos: healthInfosReducer,
  documentTypes: documentTypeReducer,
  overtimes: overtimeReducer,
  employees: employeeReducer,
  children: childrenReducer,
  empleave: empleaveReducer,
  emplist: emplistReducer,
  leavelist: emplistReducer,
  empLoan: empLoanReducer,
  overtimes: overtimesReducer,
  // user permission reducers
  roles: roleReducer,
  users: usersReducer,
  healthRecords: healthRecordReducer,
  disciplines: disciplineReducer,
  // theming reducer
  theme: changeState,
  module: moduleReducer,
  overtimestype: overtimesReducer,
  todo: todolistReducer,
})

export default Reducers

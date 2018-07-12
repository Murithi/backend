
// const { Query } = require('./Query')

const { VehicleQuery }= require('./Query/Vehicle') 
const { PersonnelQuery } = require('./Query/Personnel') 
const { VehicleOwnerQuery } = require('./Query/VehicleOwner')
const { RoleQuery } = require('./Query/Role')
const { UserQuery } = require('./Query/User')
const { ProjectQuery } = require('./Query/Project')
const { SectionQuery } = require('./Query/Section')
const { DriverQuery } = require('./Query/Driver')
const { VehicleAssigmentQuery } = require('./Query/VehicleAssignment')
const { PersonnelAttendanceQuery } = require('./Query/PersonnelAttendance')
const { PaymentIssueQuery } = require('./Query/PaymentIssue')
const {RepairsRequisitionQuery} = require('./Query/RepairsRequisition')
const { RequestServiceQuery } = require('./Query/RequestService')
const { MaterialRequisitionQuery } = require('./Query/MaterialRequisition')
const { MaterialCostingQuery } = require('./Query/MaterialCosting')
const { SupplierQuery } = require('./Query/Supplier')
const { OtherPaymentIssueQuery } = require('./Query/OtherPaymentIssue')
const { StoreBalanceQuery } = require('./Query/StoreBalance')
const { StoreTransactionQuery } = require('./Query/StoreTransaction')
const { VehicleInspectionQuery } = require('./Query/VehicleInspection')





const { Auth } = require('./Mutation/Auth')
const { User } = require('./Mutation/User')
const { Personnel } = require('./Mutation/Personnel')
const { Role } = require('./Mutation/Role')
const { Vehicle } = require('./Mutation/Vehicle')
const { VehicleOwner } = require('./Mutation/VehicleOwner')
const {  Driver } = require('./Mutation/Driver')
const { Project } = require('./Mutation/Project')
const { Section } = require('./Mutation/Section')
const { VehicleAssignment } = require('./Mutation/VehicleAssignment')
const { SectionAssignment } = require('./Mutation/SectionAssignment')
const { PersonnelAttendance } = require('./Mutation/PersonnelAttendance')
const { VehicleRequisition } = require('./Mutation/VehicleRequisition')
const { RepairsRequisition } = require('./Mutation/RepairsRequisition')
const { MaterialRequisition } = require('./Mutation/MaterialRequisition')
const { MaterialsCosting } = require('./Mutation/MaterialsCosting')
const { Supplier } = require('./Mutation/Supplier')
const { OtherPaymentIssue } = require('./Mutation/OtherPaymentIssue')
const { StoreBalance } = require('./Mutation/StoreBalance')
const { StoreTransaction } = require('./Mutation/StoreTransaction')
const { VehicleInspection } = require('./Mutation/VehicleInspection')

module.exports = {
    Query: {
        ...VehicleQuery,
        ...VehicleOwnerQuery,
        ...PersonnelQuery,
        ...RoleQuery,
        ...UserQuery,
        ...ProjectQuery,
        ...SectionQuery,
        ...DriverQuery,
        ...VehicleAssigmentQuery,
        ...PersonnelAttendanceQuery,
        ...PaymentIssueQuery,
        ...RepairsRequisitionQuery,
        ...RequestServiceQuery,
        ...MaterialRequisitionQuery,
        ...MaterialCostingQuery,
        ...SupplierQuery,
        ...OtherPaymentIssueQuery,
        ...StoreBalanceQuery,
        ...StoreTransactionQuery,
        ...VehicleInspectionQuery,

    },
    Mutation: {
        ...Auth,
        ...User,
        ...Personnel,
        ...Role,
        ...Vehicle,
        ...VehicleOwner,
        ...Driver,
        ...Project,
        ...Section,
        ...VehicleAssignment,
        ...SectionAssignment,
        ...PersonnelAttendance,
        ...VehicleRequisition,
        ...RepairsRequisition,
        ...MaterialRequisition,
        ...MaterialsCosting,
        ...Supplier,
        ...OtherPaymentIssue,
        ...StoreBalance,
        ...StoreTransaction,
        ...VehicleInspection,

    }
}
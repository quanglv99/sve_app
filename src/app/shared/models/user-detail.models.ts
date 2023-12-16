
import { BranchModel } from "./branch.models"
import { Employee } from "./employee.models"
export interface UserDetailModel {
    id: number,
    employee: Employee,
    branch: BranchModel,
    frontCard: string,
    backCard: string,
    portrait: string,
    other: string,
    biometricStatus: string,
    passcode: number,
    bioStatus: string,
    createdDate: Date,
    updatedDate: Date,
    supporter:string,
    fingerPrint: string,
    faceId: string,
}
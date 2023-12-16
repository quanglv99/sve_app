import { BranchModel } from "./branch.models"
import { MemberModel } from "./member.models"

export interface Employee {
    id: number,
    code: string,
    loginName:string,
    gender: string,
    email: string,
    contractEndDate: string,
    contractType: string,
    mobile: string,
    workAddress: BranchModel[],
    cardCode: string,
    fullname: string,
    jobcode: string,
    position: string,
    members: MemberModel[],
    status: string
}
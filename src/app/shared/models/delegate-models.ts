import { BranchModel } from "./branch.models";
import { Employee } from "./employee.models";
import { MemberModel } from "./member.models";

export interface DelegateModel {
    id: number;
    branch: BranchModel;
    member: MemberModel;
    startDate: string;
    endDate: string;
    owner: Employee;
    employee: Employee;
    note:string;
    approver: string;
    file: string;
    createdDate: string;
    createdUser: string;
    status: {id: number, name: string };
  }
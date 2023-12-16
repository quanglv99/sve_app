import { BranchModel } from "./branch.models";
import { Employee } from "./employee.models";
import { MemberModel } from "./member.models";

export interface AssignModel {
  id: number;
  branch: BranchModel;
  owner: Employee;
  member: MemberModel;
  startDate: string;
  endDate: string;
  employee: Employee;
  note: string;
  createdDate: string;
  createdUser: string;
  approver: string;
  status: { id: number; name: string };
}

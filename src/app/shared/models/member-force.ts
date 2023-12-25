import { Employee } from './employee.models';


export interface MemberForceModel {
    id: number;
    nameMemberForce: string;
    employee: Employee[];
    noteMemberForce: string;
    status: string;
  }
  
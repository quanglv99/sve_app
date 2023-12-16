import { JobcodeModel } from "./jobcode.models";

export interface MemberModel {
  id: number;
  name: string;
  jobcodes: JobcodeModel[];
  note: string;
  status: string;
}

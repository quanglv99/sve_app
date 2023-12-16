import { MemberModel } from "./member.models";

export interface VaultConfigModel {
  id: number,
  nameConfig: string,
  members: MemberModel[],
  noteConfig: string;
  status: string;
}

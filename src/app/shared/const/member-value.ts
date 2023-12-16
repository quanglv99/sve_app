import { MemberModel } from '../models/member.models';

export const MEMBER_LIST: MemberModel[] = [
  { id: 1, name: 'Thành phần số 1', jobcodes: [
    { id: 1, jobcode: 'Jobcode1', descriptionJobcode: 'Description1', active: 'Action1' },
    { id: 2, jobcode: 'Jobcode2', descriptionJobcode: 'Description2', active: 'Action2' }
  ], status: 'active', note:'' },
  { id: 2, name: 'Thành phần số 2', jobcodes: [
    { id: 3, jobcode: 'Jobcode3', descriptionJobcode: 'Description3', active: 'Action3' },
    { id: 4, jobcode: 'Jobcode4', descriptionJobcode: 'Description4', active: 'Action4' }
  ], status: 'active', note:''  },
  { id: 3, name: 'Thành phần số 3', jobcodes: [
    { id: 5, jobcode: 'Jobcode5', descriptionJobcode: 'Description5', active: 'Action5' },
    { id: 6, jobcode: 'Jobcode6', descriptionJobcode: 'Description6', active: 'Action6' }
  ], status: 'active', note:''  },
];

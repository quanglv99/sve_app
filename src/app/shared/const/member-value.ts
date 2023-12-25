import { MemberModel } from '../models/member.models';

export const MEMBER_LIST: MemberModel[] = [
  { id: 1, name: 'Thành phần số 1', jobcodes: [
    { id: 1, jobcode: 'Jobcode1', descriptionJobcode: 'Description1', status: 'active' },
    { id: 2, jobcode: 'Jobcode2', descriptionJobcode: 'Description2', status: 'Action2' }
  ], status: 'active', note:'', employee: {
    id: 101,
    code: 'EMP101',
    loginName: 'emp1',
    gender: 'Male',
    email: 'emp1@example.com',
    contractEndDate: '2023-12-31',
    contractType: 'Full-time',
    mobile: '123456789',
    workAddress: [],  // Thêm thông tin địa chỉ là một mảng của BranchModel nếu cần
    cardCode: 'C001',
    fullname: 'Employee 1',
    jobcode: 'Jobcode1',
    position: 'Position1',
    members: [],  // Khởi tạo mảng rỗng, có thể thêm thông tin về các thành phần liên quan nếu cần
    status: 'active'
  } },
  { id: 2, name: 'Thành phần số 2', jobcodes: [
    { id: 3, jobcode: 'Jobcode3', descriptionJobcode: 'Description3', status: 'Action3' },
    { id: 4, jobcode: 'Jobcode4', descriptionJobcode: 'Description4', status: 'Action4' }
  ], status: 'active', note:'', employee: {
    id: 101,
    code: 'EMP101',
    loginName: 'emp1',
    gender: 'Male',
    email: 'emp1@example.com',
    contractEndDate: '2023-12-31',
    contractType: 'Full-time',
    mobile: '123456789',
    workAddress: [],  // Thêm thông tin địa chỉ là một mảng của BranchModel nếu cần
    cardCode: 'C001',
    fullname: 'Employee 1',
    jobcode: 'Jobcode1',
    position: 'Position1',
    members: [],  // Khởi tạo mảng rỗng, có thể thêm thông tin về các thành phần liên quan nếu cần
    status: 'active'
  }  },
  { id: 3, name: 'Thành phần số 3', jobcodes: [
    { id: 5, jobcode: 'Jobcode5', descriptionJobcode: 'Description5', status: 'Action5' },
    { id: 6, jobcode: 'Jobcode6', descriptionJobcode: 'Description6', status: 'Action6' }
  ], status: 'active', note:'', employee: {
    id: 101,
    code: 'EMP101',
    loginName: 'emp1',
    gender: 'Male',
    email: 'emp1@example.com',
    contractEndDate: '2023-12-31',
    contractType: 'Full-time',
    mobile: '123456789',
    workAddress: [],  // Thêm thông tin địa chỉ là một mảng của BranchModel nếu cần
    cardCode: 'C001',
    fullname: 'Employee 1',
    jobcode: 'Jobcode1',
    position: 'Position1',
    members: [],  // Khởi tạo mảng rỗng, có thể thêm thông tin về các thành phần liên quan nếu cần
    status: 'active'
  }  },
];

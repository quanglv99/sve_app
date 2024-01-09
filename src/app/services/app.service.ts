
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private appConfig: any;
  constructor(private http: HttpClient) {}

  loadConfig(){
    return this.http
          .get('assets/config.json')
          .toPromise()
          .then((data) => {
            this.appConfig = data;
          })
  }

  getAssignUrl():string{
    return this.appConfig.ASSIGN_LIST
  }

  getEmployees():string{
    return this.appConfig.EMPLOYEES
  }

  getDelegateUrl():string{
    return this.appConfig.DELEGATE_LIST
  }

  getUserDetail():string{
    return this.appConfig.USER_DETAIL
  }
  getMemberList(): string{
    return this.appConfig.MEMBER_LIST
  }
  getJobcodeList(): string{
    return this.appConfig.JOBCODE_LIST
  }
  getConfigMemberList(): string{
    return this.appConfig.CONFIG_MEMBER_LIST
  }
  getVibJobcodeList(): string{
    return this.appConfig.VIB_JOBCODE_LIST
  }
  getMemberForceList(): string{
    return this.appConfig.MEMBER_FORCE_LIST
  }

  getLoginApi()
  {
    return this.appConfig.LOGIN
  }

  getLogOutUrl()
  {
    return this.appConfig.LOGOUT
  }

  getBranches()
  {
    return this.appConfig.BRANCHES
  }

  getMemberInfoUrl()
  {
    return this.appConfig.MEMBER_READ
  }
  getEnrollCheckUrl()
  {
    return this.appConfig.ENROLL_CHECK
  }
  getEnrollUpload()
  {
    return this.appConfig.ENROLL_UPLOAD
  }

  getEnrollScanUrl()
  {
    return this.appConfig.INFO_CARD
  }

  getJobQueryUrl()
  {
    return this.appConfig.JOB_QUERY
  }

  getPasscodeUrl()
  {
    return this.appConfig.PASSCODE
  }

  getCallSupporterUrl()
  {
    return this.appConfig.CALL_SUPPORTER
  }

  getCertUrl()
  {
    return this.appConfig.WELCOME
  }

  getTaskListUrl()
  {
    return this.appConfig.TASK_LIST
  }

  getApproveUrl()
  {
    return this.appConfig.APPROVE
  }
}


import { Injectable } from '@angular/core';

//@Injectable()
export class UserPermissionsService {

  public USERS_CREATE_PERMISSION: string = '';
  public USERS_UPDATE_PERMISSION: string = '';
  public USERS_DELETE_PERMISSION: string = '';

  constructor(public UsersCreatePermission: string,
    public UsersUpdatePermission: string,
    public UsersDeletePermission: string) {
    this.USERS_CREATE_PERMISSION = UsersCreatePermission;
    this.USERS_UPDATE_PERMISSION = UsersUpdatePermission;
    this.USERS_DELETE_PERMISSION = UsersDeletePermission;
  }
}


@Injectable()
export class UserModulePermissionsService extends UserPermissionsService {
  constructor() {
    super("ClientsCreate",
      "ClientsEdit",
      "ClientsDelete");
  }
}

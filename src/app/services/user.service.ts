import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, User } from '../views/account/models/user';
import { Observable } from 'rxjs';

export interface RegisterRequest {
    FullName: string;
    Email: string;
    Mobile: string;
    Password: string;
    ConfirmPassword: string;
  }
  
  export interface RegisterResponse {
    success: boolean;
    message: string;
    userId?: string;
    requiresApproval?: boolean;
  }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private globals: Globals) {}

  getAllUsers() {
    return this.http.get<any[]>(
      this.globals.BASE_ASPNET_ENDPOINT + '/Account/GetAllUser'
    );
  }
  saveOrUpdateUser(userData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post(
      this.globals.BASE_ASPNET_ENDPOINT + '/Account/CreateOrEdit',
      JSON.stringify(userData),
      { headers }
    );
  }
  
  deleteUser(userId: number) {
    return this.http.delete<User>(
      `${this.globals.BASE_ASPNET_ENDPOINT}/Account/DeleteUser?id=${userId}`
    );
  }
  ChangePasswordSelf(model: FormData) {
    return this.http.post(
      `${this.globals.BASE_ASPNET_ENDPOINT}/ChangePasswordSelf`,
      model
    );
  }

  
}

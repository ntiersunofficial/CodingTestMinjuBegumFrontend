import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CreateOrEditUserModalComponent } from '../create-or-edit-user-modal/create-or-edit-user-modal.component';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  @ViewChild('addOrUpdateUserModal', { static: true })
  createOrEditUser: CreateOrEditUserModalComponent;

  allUsers: User[] = [];
  loggedInUserId: number = 0;

  constructor(
    private _userService: UserService,
    private _spinnerService: SpinnerService,
    private _confirmationService: ConfirmationService,
    private _toastrService: ToastrService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this._authService.getLoggedInUserId();
    if (this.loggedInUserId <= 0) this._authService.redirectToLoginPage();

    this.getAllUsers();
  }
  getAllUsers() {
    this._spinnerService.showSpinner();
    this._userService.getAllUsers().subscribe((e) => {
      this.allUsers = e;
      this._spinnerService.hideSpinner();
    });
  }
  creatUser() {
    this.createOrEditUser.show();
  }
  editUser(user: User) {
    console.log(user);
    this.createOrEditUser.show(user);
  }
  deleteUser(user: User) {
    this.confirmDelete(user.id);
  }
  confirmDelete(id: number) {
    console.log('Id :', id);
    this._confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      key: 'itemDelete',
      accept: () => {
        this._userService.deleteUser(id).subscribe(
          (e) => {
            this.getAllUsers();
            this._toastrService.success('Data Deleted Successfully!');
          },
          (error) => {
            this._toastrService.error('', 'Error');
          }
        );
      },
    });
  }
}

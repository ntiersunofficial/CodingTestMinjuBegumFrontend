import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { WidgetsModule } from '../widgets/widgets.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { UserListComponent } from './user-list/user-list.component';

//import { SharedAppModule } from 'src/app/shared/shared-app-module.module';
import { CreateOrEditUserModalComponent } from './create-or-edit-user-modal/create-or-edit-user-modal.component';
import { SharedAppModule } from 'src/app/shared/shared-app-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    FormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    DataTablesModule,
    SharedAppModule,
  ],
  declarations: [UserListComponent, CreateOrEditUserModalComponent],
})
export class AccountModule {}

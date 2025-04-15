import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { ExcelFileProcessComponent } from '../generic-items/excel-file-process/excel-file-process.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administration',
    },
    children: [
      {
        path: 'process-file',
        component: ExcelFileProcessComponent,
        data: {
          title: 'Process Data',
        },
      },
      {
        path: 'users',
        component: UserListComponent,
        data: {
          title: 'User List',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

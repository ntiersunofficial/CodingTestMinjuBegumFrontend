import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ <-- Import FormsModule
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  CardComponent,
  CardBodyComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ <-- Add FormsModule here
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    IconDirective
  ]
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.isLoading = true;

    this.authService.login(this.userName, this.password).subscribe({
      next: (response) => {
        this.authService.setSession(response);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading = false;
        // handle error
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

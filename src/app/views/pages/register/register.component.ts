import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormDirective
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { cilUser, cilPhone, cilLockLocked } from '@coreui/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    FormDirective,
    IconModule
  ]
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  registrationForm!: FormGroup;
  passwordScore = 0;
  showThankYou = false;
  isLoading = false;
  errorMessage = '';
  private passwordSub: Subscription = new Subscription();
  private chart: echarts.ECharts | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    public iconSet: IconSetService
  ) {
    iconSet.icons = { cilUser, cilPhone, cilLockLocked };
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setupPasswordListener();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initializeForm(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10,15}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const length = value.length;

      let score = 0;
      if (length >= 8) score += 20;
      if (length >= 12) score += 10;
      if (hasUpperCase) score += 20;
      if (hasLowerCase) score += 20;
      if (hasNumber) score += 15;
      if (hasSpecialChar) score += 15;

      this.passwordScore = Math.min(100, score);
      this.updateChart();

      return this.passwordScore >= 75 ? null : { weakPassword: true };
    };
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };

  initChart(): void {
    if (this.chartContainer) {
      this.chart = echarts.init(this.chartContainer.nativeElement);
      this.updateChart();
    }
  }

  updateChart(): void {
    if (!this.chart) return;

    const option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}'
          },
          data: [
            {
              value: this.passwordScore,
              name: 'SCORE'
            }
          ]
        }
      ]
    };

    this.chart.setOption(option);
  }

  setupPasswordListener(): void {
    this.passwordSub = this.registrationForm.get('password')?.valueChanges.subscribe(() => {
      this.updateChart();
    }) as Subscription;
  }

  get f() { return this.registrationForm.controls; }

  onSubmit(): void {
    if (this.registrationForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const registrationData = {
      Email: this.registrationForm.value.email,
      FullName: this.registrationForm.value.fullName,
      Password: this.registrationForm.value.password,
      PhoneNumber: this.registrationForm.value.phone,
      ConfirmPassword: this.registrationForm.value.confirmPassword,
      IsActive: 0
    };

    this.userService.saveOrUpdateUser(registrationData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.showThankYou = true;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          if (error.status === 409) {
            this.errorMessage = 'This email is already registered.';
          }
        }
      });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.passwordSub.unsubscribe();
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
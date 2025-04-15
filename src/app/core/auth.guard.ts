import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip auth for modal requests (check both query param and header)
  const isModalRequest = route.queryParams['modal'] === true;

  if (isModalRequest) {
    return true;
  }

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url },
    skipLocationChange: true
  });
  return false;
};
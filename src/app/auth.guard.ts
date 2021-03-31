import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | Promise<boolean> {
    const token = localStorage.getItem('token');

    if (!token) return this.router.navigate(['/news']);

    return true;
  }
}

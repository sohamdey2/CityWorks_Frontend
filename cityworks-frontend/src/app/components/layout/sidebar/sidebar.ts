import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isOpen: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  logout() {
    this.isOpen = false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  is(...roles: string[]): boolean {
    return this.auth.hasRole(...roles);
  }

  @HostListener('document:keydown.escape')
  onEscape(){
    this.isOpen = false;
  }
}

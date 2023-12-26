import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { User } from '../types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  http = inject(HttpClient);

  users: User[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get('http://localhost:4000/users').subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
    });
  }

  copyToClipboard(item: any) {
    navigator.clipboard.writeText(item);
  }
}

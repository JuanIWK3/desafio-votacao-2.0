import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    console.warn('Your order has been submitted', this.loginForm.value);
  }
}

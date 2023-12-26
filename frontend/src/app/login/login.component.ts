import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);

  loginForm = this.formBuilder.nonNullable.group({
    email: '',
    password: '',
  });

  onSubmit(): void {
    console.warn(this.loginForm.value);

    // john.doe0.7014463386350545@email.com
    // 12345678

    this.http
      .post('http://localhost:4000/signin', this.loginForm.value)
      .subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
      });
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PautasComponent } from './pautas/pautas.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'pautas',
    component: PautasComponent,
  },
  { path: 'users', component: UsersComponent },
];

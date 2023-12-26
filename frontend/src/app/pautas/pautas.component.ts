import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Pauta, User } from '../types';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pautas',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './pautas.component.html',
  styleUrl: './pautas.component.css',
})
export class PautasComponent implements OnInit {
  http = inject(HttpClient);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  pautas: Pauta[] = [];
  user: User = {} as User;

  createPautaForm = this.formBuilder.group({
    title: '',
  });

  ngOnInit(): void {
    this.getPautas();
    this.getUser();
  }

  onSubmit(): void {
    console.warn(this.createPautaForm.value);

    const data = {
      ...this.createPautaForm.value,
      createdById: this.user.id,
    };

    this.http
      .post('http://localhost:4000/pautas/create', data)
      .subscribe((data: any) => {
        console.log(data);
        this.getPautas();
      });
  }

  getPautas() {
    this.http.get('http://localhost:4000/pautas').subscribe((data: any) => {
      this.pautas = data;
      console.log(this.pautas);
    });
  }

  getUser() {
    const item = localStorage.getItem('user');
    const user = item ? JSON.parse(item) : null;

    console.log(user);

    if (!user) {
      this.router.navigate(['/login']);
    } else {
      this.user = user;
    }
  }

  getVotes(pauta: Pauta): { yes: number; no: number } {
    let yes = 0;
    let no = 0;

    pauta.votes.forEach((vote) => {
      if (vote.vote) {
        yes++;
      } else {
        no++;
      }
    });

    return { yes, no };
  }

  userVoted(pauta: Pauta): boolean {
    return pauta.votes.some((vote) => vote.userId === this.user.id);
  }

  vote(pauta: Pauta, vote: boolean): void {
    const data = {
      pautaId: pauta.id,
      userId: this.user.id,
      vote,
    };

    this.http
      .post('http://localhost:4000/pautas/vote', data)
      .subscribe((data: any) => {
        console.log(data);
        this.getPautas();
      });
  }
}

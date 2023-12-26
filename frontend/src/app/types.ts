export type Pauta = {
  id: string;
  title: string;
  votes: Vote[];
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export type Vote = {
  id: string;
  vote: boolean;
  userId: string;
  pautaId: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  cpf: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  pautas: Pauta[];
  password: string;
};

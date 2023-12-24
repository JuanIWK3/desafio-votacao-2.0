export interface UserRepository {
  save(user: any): Promise<any>;
  getById(anyId: string): Promise<any | null>;
  getByEmail(email: string): Promise<any | null>;
  getByCpf(cpf: string): Promise<any | null>;
}

import { Authority } from './authority.model';

export class Account {
  constructor(
    public activated: boolean,
    public authorities: Authority[],
    public email: string,
    public firstName: string,
    public langKey: string,
    public lastName: string,
    public login: string,
    public imageUrl: string
  ) {}
}

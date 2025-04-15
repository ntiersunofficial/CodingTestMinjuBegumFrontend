export class User {
  constructor(
    public id: number = 0,
    public firstName: string = '',
    public lastName: string = '',
    public email: string | number = '',
    public mobile: string | number = '',
    public loginUserId: string | number = '',
    public userId: string | number = '',
    public password: string = '',
    public sites: number[] = [],
    public siteIds: number[] = [],
    public roleId: number = 0,
    public isActive: boolean = false,
    public otp: string = ''
  ) {}
}

export interface IUser {
   id: number;
   firstName: string;
   lastName: string;
   email: string | number;
   mobile: string | number;
   loginUserId: string | number;
   userId: string | number;
   password: string;
   sites: number[];
   roleId: number;
   isActive: boolean;
   otp: string;
}

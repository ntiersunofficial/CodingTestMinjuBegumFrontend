export class UserCopy {
  constructor(
    public id: number = 0,
    public first_name: string = '',
    public last_name: string = '',
    public designation: string = '',
    public email: string | number = '',
    public mobile: string | number = '',
    public username: string | number = '',
    public password: string = '',
    public country_code: number = 11,
    public designation_code: number | undefined = undefined,
    public user_type: number = 4,
    public is_active: boolean = true,
    public otp: string = ''
  ) {}
}

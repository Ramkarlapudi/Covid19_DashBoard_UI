export class UserProfile{
  userid!: number;
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  passcode: string | undefined;


  public constructor(init?: Partial<UserProfile>) {
      Object.assign(this, init);
  }
}

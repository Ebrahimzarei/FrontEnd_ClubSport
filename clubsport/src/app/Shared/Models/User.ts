

export class User  {

  public Id: number;
  public FirstName: string;
  public LastName: string;
  public Username: string;
  public Password: string;
  public Token:string;
  public Role:string;
  constructor(
{ Id, FirstName, LastName, Username, Token,Password,Role}: {

  Id: number;
  LastName: string;
  FirstName: string;
  Token:string;
  Role:string;
  Password: string;
  Username: string;
  CoachSport: string;
})
              {
                this.Id = Id;
                this.FirstName = FirstName;
                this.LastName = LastName;
                this.Username = Username;
                this.Password = Password;
                this.Token=Token;
                this.Role=Role;
}

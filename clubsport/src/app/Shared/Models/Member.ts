
import { RoleAccess } from './RoleAccess';
import {BaseEntity} from '../Models/Entity';
export class Member extends BaseEntity {
  public Id: number;
  public FullName: string;
  public id: string;
  // tslint:disable-next-line: variable-name
  public Natinalcode: number;
  // tslint:disable-next-line: variable-name
  public Photo: string;
  // tslint:disable-next-line: variable-name
  public FatherName: string;
  // tslint:disable-next-line: variable-name

  public UserName: string;
  public Password: string;
  public Token: string;
  public Role: string;

  // tslint:disable-next-line: variable-name
  public R_Access: RoleAccess;

  // tslint:disable-next-line: variable-name
  constructor(
{ Id,id,Role
  , FullName, Ncode, Photo, FatherName, UserName,Password,Token, R_Access,InsertDateTime, }: {
  // tslint:disable-next-line: variable-name
  Id: number; FullName: string;
  id: string;
  Role:string;
  InsertDateTime: Date
 
  // tslint:disable-next-line: variable-name
     Ncode: number; Photo: string; FatherName: string; UserName: string;Password: string; Token: string;R_Access: RoleAccess
})
              {
                super(Id);
                this.Id = Id;
                this.id = id;
                this.FullName = FullName;
                this.Natinalcode = Ncode;
                this.Photo = Photo;

                this.FatherName = FatherName;
                this.UserName = UserName;
                this.Password = Password;

                this.Token = Token;
                this.R_Access = R_Access;
                this.Role=Role;
              
  }
}

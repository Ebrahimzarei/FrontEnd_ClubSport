
import { EventSport } from './EventSport';
import { MemberSport } from './MemberSport';
import { Roles } from '../Enum/Roles';
import {BaseEntity} from '../Models/Entity';
export class RoleAccess extends BaseEntity {

  public Id: number;
  public RoleId: string;
  public Role: Roles;
  // tslint:disable-next-line: variable-name
  public NameRole: string;


  // tslint:disable-next-line: variable-name
  public E_Sport: EventSport;
  // tslint:disable-next-line: variable-name
  public M_Sport: MemberSport;
  public MemberRef: string;


  constructor(
{ Id,RoleId, Role, NameRole, E_Sport, M_Sport,MemberRef,  InsertDateTime}: {

  // tslint:disable-next-line: variable-name
  Id: number;
  InsertDateTime: Date;
  RoleId: string;
  // tslint:disable-next-line: variable-name
  Role: Roles; NameRole: string; E_Sport: EventSport; AbsenceCost: number;M_Sport: MemberSport; MemberRef: string ;
})
              {
                super(Id);
                this.Id = Id;
                this.RoleId = RoleId;
                this.Role = Role;
                this.NameRole = NameRole;
                this.E_Sport = E_Sport;
                this.M_Sport = M_Sport;
                this.MemberRef = MemberRef;


   }
}

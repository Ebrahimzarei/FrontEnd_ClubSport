import { Roles } from '../Enum/Roles';
import { EventSport } from '../Models/EventSport';
import { MemberSport } from '../Models/MemberSport';

// tslint:disable-next-line: no-empty-interface
export interface AuthRoleAccess {
   Id: number;

   Role: Roles;
  // tslint:disable-next-line: variable-name
   NameRole: string;


  // tslint:disable-next-line: variable-name
   E_Sport: EventSport[];
  // tslint:disable-next-line: variable-name
   M_Sport: MemberSport[];
   MemberRef: number;
}

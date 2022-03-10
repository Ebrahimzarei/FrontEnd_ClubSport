import { EventSport } from '../Models/EventSport';
import { ServicesSport } from '../Models/ServicesSport';
import { ProgramSport } from '../Models/ProgramSport';
import { MemberSport } from '../Models/MemberSport';

// tslint:disable-next-line: no-empty-interface
export interface AuthHallSport {
   Id: number;
   Name: string;
  // tslint:disable-next-line: variable-name
   E_Sport: EventSport[];
  // tslint:disable-next-line: variable-name
   S_Sport: ServicesSport[];
  // tslint:disable-next-line: variable-name
   P_Sport: ProgramSport[];
  // tslint:disable-next-line: variable-name
   M_Sport: MemberSport[];
   MemberSportRef: number;
}

import { RoleAccess } from '../Models/RoleAccess';
import { HallSport } from '../Models/HallSport';
import { ProgramSport } from '../Models/ProgramSport';
import { FieldSport } from '../Models/FieldSport';

// tslint:disable-next-line: no-empty-interface
export interface AuthEventSport {
   Id: number;
   NameEvent: string;
   EventResult: string;
   RefeRee: string;
   FromDate: string;
   ToDate: string;

   HallSport: HallSport[];
   HallSportRef: number;
  // tslint:disable-next-line: variable-name
   R_AccessRef: number;
   RoleAccess: RoleAccess[];
  // tslint:disable-next-line: variable-name
   F_Sport: FieldSport[];
   FieldSportRef: number;
  // tslint:disable-next-line: variable-name
   P_Sport: ProgramSport[];
   ProgramSportRef: number;
}

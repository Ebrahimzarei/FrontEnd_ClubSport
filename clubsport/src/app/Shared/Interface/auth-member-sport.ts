import { RoleAccess } from '../Models/RoleAccess';
import { ProgramSport } from '../Models/ProgramSport';
import { HallSport } from '../Models/HallSport';

// tslint:disable-next-line: no-empty-interface
export class AuthMemberSport {

   id: number;
   fullName:string;
   ncode: number;
  // tslint:disable-next-line: variable-name
   photo: string;

    r_Access: RoleAccess[];
  // tslint:disable-next-line: variable-name
   p_Sport: ProgramSport[];

  h_sport: HallSport[];
  hallSportRef:number;
}
export class AuthMemberSportOutPut {

  Id: number;
  FullName:string; 
  Ncode: number;
 // tslint:disable-next-line: variable-name
  Photo: string;

   R_Access: RoleAccess[];
 // tslint:disable-next-line: variable-name
  P_Sport: ProgramSport[];

H_sport: HallSport[];
 HallSportRef:number;
}

 
import { MemberSport } from '../Models/MemberSport';
import { HallSport } from '../Models/HallSport';
import { FieldSport } from '../Models/FieldSport';
import { EventSport } from '../Models/EventSport';
import { AuthMemberSport, AuthMemberSportOutPut } from './auth-member-sport';
import { Days } from '../Models/Days';

// tslint:disable-next-line: no-empty-interface
export interface AuthProgramSport {
   Id: number;
   NameProgram: string;
   FromDate: string;
  // tslint:disable-next-line: variable-name
   ToDate: string;

   DetailsSport: string;
  // tslint:disable-next-line: variable-name
   DaysOfYear: Days;

   AbsenceCost: number;
  // tslint:disable-next-line: variable-name
   M_Sport: MemberSport[];
   PMemberSportRef: number;

   // tslint:disable-next-line: variable-name
   F_Sport: FieldSport[];

   FieldSportRef: number;

  // tslint:disable-next-line: variable-name
   H_Sport: HallSport[];
   HallSportRef: number;

  // tslint:disable-next-line: variable-name
   E_Sport: EventSport[];
}
export interface AuthProgramSportInput {
   Id: number;
   NameProgram: string;
   FromDate: string;
  // tslint:disable-next-line: variable-name
   ToDate: string;

   DetailsSport: string;
  // tslint:disable-next-line: variable-name
   DaysOfYear: Days;

   AbsenceCost: number;
  // tslint:disable-next-line: variable-name   
   M_Sport: AuthMemberSportOutPut;
   PMemberSportRef: number;

   // tslint:disable-next-line: variable-name
   F_Sport: FieldSport;

   FieldSportRef: number;

  // tslint:disable-next-line: variable-name
   H_Sport: HallSport;
   HallSportRef: number;
   ProgramSportId:number;
  // tslint:disable-next-line: variable-name
   E_Sport: EventSport;
}

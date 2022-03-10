
import { EventSport } from './EventSport';
import { HallSport } from './HallSport';

import { MemberSport } from './MemberSport';
import { FieldSport } from './FieldSport';
import {BaseEntity} from '../Models/Entity';
import{Days}from '../Models/Days';
import { AuthMemberSport, AuthMemberSportOutPut } from '../Interface/auth-member-sport';
 
export class ProgramSport extends BaseEntity {

  public Id: number;
  public Day:string;

  public FromDate: string;
  // tslint:disable-next-line: variable-name
  public ToDate: string;

  public DetailsSport: string;
  // tslint:disable-next-line: variable-name
 

  public AbsenceCost: number;  
  // tslint:disable-next-line: variable-name
  public M_Sport: AuthMemberSportOutPut;
  public PMemberSportRef: number;

   // tslint:disable-next-line: variable-name
  public F_Sport: FieldSport;

  public FieldSportRef: number;
  public NameProgram: string;
  // tslint:disable-next-line: variable-name
  public H_Sport: HallSport;
  public HallSportRef: number;
  public ProgramSportId: number;
  // tslint:disable-next-line: variable-name
  public E_Sport: EventSport;
  public DaysOfYear:Days;
  // tslint:disable-next-line: variable-name   
  constructor(
{ Id, FromDate, ToDate, DetailsSport, AbsenceCost, M_Sport, PMemberSportRef,
   ProgramSportId,NameProgram,
   Day,
   DaysOfYear
  , F_Sport, FieldSportRef, H_Sport, HallSportRef, E_Sport}: {
//Days:Days,
  // tslint:disable-next-line: variable-name
  Id: number;
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: max-line-length
  FromDate: string; ToDate: string; DetailsSport: string; AbsenceCost: number;
  Day:string;
  NameProgram: string;
  ProgramSportId: number ;
  

  M_Sport: AuthMemberSportOutPut; PMemberSportRef: number ; F_Sport: FieldSport ;
  FieldSportRef: number ; H_Sport: HallSport; HallSportRef: number; E_Sport: EventSport; DaysOfYear: Days
})
              {
                super(Id);
                this.Id = Id;
                this.NameProgram = NameProgram;
                this.FromDate = FromDate;
                this.ToDate = ToDate;
                this.DaysOfYear=DaysOfYear;
                this.DetailsSport = DetailsSport;
                this.AbsenceCost = AbsenceCost;
                this.M_Sport = M_Sport;
                this.ProgramSportId = ProgramSportId;
                this.PMemberSportRef = PMemberSportRef;
                this.F_Sport = F_Sport;
                this.Day=Day;
                this.FieldSportRef = FieldSportRef;

                this.H_Sport = H_Sport;
                this.HallSportRef = HallSportRef;
                this.E_Sport = E_Sport;
           

   }
}

export class ProgramSportTwo extends BaseEntity {

  public id: number;

  public fromDate: string;
  // tslint:disable-next-line: variable-name
  public toDate: string;

  public detailsSport: string;
  // tslint:disable-next-line: variable-name
  public daysOfYear: Days;

  public absenceCost: number;  
  // tslint:disable-next-line: variable-name
  public m_Sport: AuthMemberSport;
  public pMemberSportRef: number;

   // tslint:disable-next-line: variable-name
  public f_Sport: FieldSport;

  public fieldSportRef: number;
  public nameProgram: string;
  // tslint:disable-next-line: variable-name
  public h_Sport: HallSport;
  public hallSportRef: number;
  public programSportId: number;
  // tslint:disable-next-line: variable-name
  public e_Sport: EventSport;
  // tslint:disable-next-line: variable-name   
  constructor(
{ id, fromDate, toDate, detailsSport, absenceCost, m_Sport, pMemberSportRef,
   programSportId,nameProgram
  , f_Sport, fieldSportRef, h_Sport, hallSportRef, e_Sport, daysOfYear}: {

  // tslint:disable-next-line: variable-name
  id: number;
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: max-line-length
  fromDate: string; toDate: string; detailsSport: string; absenceCost: number;

  nameProgram: string;
  programSportId: number ;

  m_Sport: AuthMemberSport; pMemberSportRef: number ; f_Sport: FieldSport ;
  fieldSportRef: number ; h_Sport: HallSport; hallSportRef: number; e_Sport: EventSport; daysOfYear: Days
})
              {
                super(id);
                this.Id = id;
                this.nameProgram = nameProgram;
                this.fromDate = fromDate;
                this.toDate = toDate;
                this.detailsSport = detailsSport;
                this.absenceCost = absenceCost;
                this.m_Sport = m_Sport;
                this.programSportId = programSportId;
                this.pMemberSportRef = pMemberSportRef;
                this.f_Sport = f_Sport;
                this.fieldSportRef = fieldSportRef;

                this.h_Sport = h_Sport;
                this.hallSportRef = hallSportRef;
                this.e_Sport = e_Sport;
                this.daysOfYear = daysOfYear;

   }
}

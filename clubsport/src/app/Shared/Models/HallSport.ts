
import {ProgramSport} from '../Models/ProgramSport';
import {ServicesSport} from '../Models/ServicesSport';

import { EventSport } from './EventSport';
import { MemberSport } from './MemberSport';
import {BaseEntity} from '../Models/Entity';
import { AuthMemberSport } from '../Interface/auth-member-sport';
export class HallSport  {
   public Id: number;
  public Name: string;
  public M_Sport?: MemberSport;
  
  public MemberSportRef:number;
 
  // tslint:disable-next-line: variable-name
  constructor(
{  Name,  M_Sport,Id ,MemberSportRef}: {
  // tslint:disable-next-line: variable-name
   Name: string,
   MemberSportRef:number
 Id:number
  // tslint:disable-next-line: variable-name
  M_Sport?: MemberSport
})
              {

               // super(Id);
               this.Id = Id;
               this.MemberSportRef=MemberSportRef;
                this.Name = Name;
                this.M_Sport = M_Sport;
  }
}

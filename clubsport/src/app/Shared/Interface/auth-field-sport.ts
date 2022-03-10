import { ProgramSport } from '../Models/ProgramSport';
import { EventSport } from '../Models/EventSport';

// tslint:disable-next-line: no-empty-interface
export interface AuthFieldSport {
   Id: number;
   NameField: string;
   
   CodeSportField: string;
   HallSportRef: number;
  // tslint:disable-next-line: variable-name
   E_Sport: EventSport[];
  // tslint:disable-next-line: variable-name
   P_Sport: ProgramSport[];
}

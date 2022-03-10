import { HallSport } from '../Models/HallSport';

// tslint:disable-next-line: no-empty-interface
export interface AuthServicesSport {
   Id: number;

   NameService: string;
  // tslint:disable-next-line: variable-name
   H_sport: HallSport[];


  // tslint:disable-next-line: variable-name
   HallSportRef: number;
  // tslint:disable-next-line: variable-name
   CoachSport: string;
}


import {BaseEntity} from '../Models/Entity';
import { HallSport } from './HallSport';
export class ServicesSport extends BaseEntity {

  public Id: number;

  public NameService: string;
  // tslint:disable-next-line: variable-name
  public H_sport: HallSport;


  // tslint:disable-next-line: variable-name
  public HallSportRef: number;
  // tslint:disable-next-line: variable-name
  public CoachSport: string;
  public ServiceId: number;



  constructor(
{ Id, ServiceId, NameService, H_sport, HallSportRef, CoachSport, InsertDateTime}: {

  // tslint:disable-next-line: variable-name
  Id: number;
  InsertDateTime: Date;
  ServiceId: number;
  // tslint:disable-next-line: variable-name
  NameService: string; H_sport: HallSport; HallSportRef: number; CoachSport: string;
})
              {
                super(Id);
                this.Id = Id;
                this.ServiceId = ServiceId;
                this.NameService = NameService;
                this.H_sport = H_sport;
                this.HallSportRef = HallSportRef;
                this.CoachSport = CoachSport;
   }
}

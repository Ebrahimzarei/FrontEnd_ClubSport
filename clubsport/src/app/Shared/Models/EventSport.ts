import {RoleAccess} from '../Models/RoleAccess';
import {HallSport} from '../Models/HallSport';
import {FieldSport} from '../Models/FieldSport';
import {ProgramSport} from '../Models/ProgramSport';
import {BaseEntity} from '../Models/Entity';

export class EventSport extends BaseEntity {
  public Id: number;
 // public EventId?: string;
  public NameEvent: string;
  public EventResult: string;
  public RefeRee: string;
  public FromDate: string;
  public ToDate: string;

  public HallSport: HallSport;
  public HallSportRef: number;
  // tslint:disable-next-line: variable-name
  public R_AccessRef: number;
  public RoleAccess: RoleAccess;
  // tslint:disable-next-line: variable-name
  public F_Sport: FieldSport;
  public FieldSportRef: number;
  // tslint:disable-next-line: variable-name
  public P_Sport: ProgramSport;
  public ProgramSportRef: number;
   constructor(  HallSport: HallSport
    , Id: number
    , NameEvent: string
    , EventResult: string
    , InsertDateTime: Date,
                 RefeRee: string,
                // EventId: string,
                 FromDate: string,
                 ToDate: string,
                 HallSportRef: number,
                 R_AccessRef: number,
                 RoleAccess: RoleAccess,
                 F_Sport: FieldSport,
                 FieldSportRef: number,
                 // tslint:disable-next-line: variable-name
                 P_Sport: ProgramSport,
                 ProgramSportRef: number


              ) {
    super(Id);
    this.Id = Id;
  //  this.EventId = EventId;
    this.NameEvent = NameEvent;
    this.EventResult = EventResult;
    this.RefeRee = RefeRee;
    this.FromDate = FromDate;
    this.ToDate = ToDate;
    this.HallSport = HallSport;
    this.HallSportRef = HallSportRef;
    this.R_AccessRef = R_AccessRef;
    this.RoleAccess = RoleAccess;
    this.F_Sport = F_Sport;
    this.FieldSportRef = FieldSportRef;
    this.P_Sport = P_Sport;
    this.ProgramSportRef = ProgramSportRef;

  }

}

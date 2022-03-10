
import {ProgramSport} from '../Models/ProgramSport';
import { RoleAccess } from './RoleAccess';
import { HallSport } from './HallSport';
import {BaseEntity} from '../Models/Entity';
export class MemberSport  {
  public id: number;
  public fullName: string;
  public ncode: number;
  // tslint:disable-next-line: variable-name
  public photo: string;
  public hallSportRef?:number; 



 

 
  constructor(
{ id,hallSportRef,  
   ncode, photo,   fullName,
    
  
  
  }: {
  // tslint:disable-next-line: variable-name
  id?: number;
  fullName?:string;
 
  hallSportRef?:number;
  // tslint:disable-next-line: variable-name
     ncode?: number; photo?: string; 


     
})
              {
             //   super(Id);
                this.id = id;
                this.fullName=fullName;
          
                this.ncode = ncode;
                this.photo = photo;
         this.hallSportRef=hallSportRef;


         
  }
}
export class MemberSportOutPut  {
  public Id: number;
  public FullName: string;
  public Ncode: number;
  // tslint:disable-next-line: variable-name
  public Photo: string;
  public HallSportRef?:number; 

 
  constructor(
{ Id,HallSportRef,  
   Ncode, Photo,   FullName}: {
  // tslint:disable-next-line: variable-name
  Id: number;
  FullName:string;
 
  HallSportRef?:number;
  // tslint:disable-next-line: variable-name
     Ncode: number; Photo: string; 
})
              {
             //   super(Id);
                this.Id = Id;
                this.FullName=FullName;
          
                this.Ncode = Ncode;
                this.Photo = Photo;
         this.HallSportRef=HallSportRef;
  }
}

 
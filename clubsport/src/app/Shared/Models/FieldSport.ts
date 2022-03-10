
import {ProgramSport} from '../Models/ProgramSport';

import { EventSport } from './EventSport';
import {BaseEntity} from '../Models/Entity';
export class FieldSport  {
  
  public NameField: string;
  public CodeSportField: number;
 public Id?:number;
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: max-line-length
  constructor( 
  
       NameField: string,
        CodeSportField: number,
        Id?:number,
    
              ) {
             
           
        this.Id=Id;
                this.NameField = NameField;
                this.CodeSportField = CodeSportField;
            
  }
}

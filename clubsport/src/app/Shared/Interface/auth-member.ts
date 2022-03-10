import { RoleAccess } from '../Models/RoleAccess';

// tslint:disable-next-line: no-empty-interface
export interface AuthMember {
  //  Id: number;
  // Ncode: number;
  // Photo: string;
  // FatherName: string;
  // UserName: string;
  // Password: string;
  // Token: string;
  // R_Access: RoleAccess[]
   Id: string;
   FullName: string;
  // tslint:disable-next-line: variable-name
  Natinalcode: number;
  // tslint:disable-next-line: variable-name
   Photo: string;
  // tslint:disable-next-line: variable-name
   FatherName: string;
  // tslint:disable-next-line: variable-name

   UserName: string;
   Password: string;
   Token: string;
   Role: string;

   R_Access: RoleAccess[];
}

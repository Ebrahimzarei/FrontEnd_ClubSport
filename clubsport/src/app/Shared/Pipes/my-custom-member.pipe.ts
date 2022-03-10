import { Pipe, PipeTransform } from '@angular/core';
import { MemberSport, MemberSportOutPut } from '../Models/MemberSport';

@Pipe({
  name: 'myCustomMemberSport'
})
export class MyCustomMemberPipe implements PipeTransform {
  M_Sport:MemberSportOutPut[];
  transform(items: MemberSportOutPut[], filter: Object): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    //عدم انتخاب سالنی که ورزشکار دارد
    let FilterMember=items.filter(item => item.HallSportRef == 0);

    return FilterMember;
}

}

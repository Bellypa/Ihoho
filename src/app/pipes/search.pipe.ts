import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genericfilter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], filter: string): any {
        // console.log(items + '  ' + filter);
        if (!items || !filter) {
            // console.log(items + '  ' + filter);
            return items;
        }
        // console.log(items + '  ' + filter);
        return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'object' 
})
export class ObjectForPipe implements PipeTransform {
    transform(value: any, arg1): any {
        return typeof value!=='object' ? [] : Object.keys(value);
    }
}
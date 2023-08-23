import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {
  transform(value: number): number {

    let roundedValue = Math.round(value);

    // if(value - roundedValue >)

    return roundedValue;
  }
}


//

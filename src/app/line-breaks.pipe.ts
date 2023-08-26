import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreaks'
})
export class LineBreaksPipe implements PipeTransform {

  transform(value: string): string {
    // regex pattern: replace all("g" which stands for "global") "\n" encounters with <br/> within the data to be transformed.
    return value.replace(/\n/g, '<br/>');
  }

}

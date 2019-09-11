/**
 * This Pipe is used to shorten the number passed in args as a value.
 * It takes a big number and transforms the output to a shorten version of it
 *
 * ex: 1200 | shortenNumber  returns 1.2K
 * 212 012 | shortenNumber returns 212k
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortenNumber',
  pure: true
})

export class ShortenNumberPipe implements PipeTransform {
  transform(value: number) {
    let formattedNumber = '';
    if (!value || value < 1000) {
      return value;
    } else if (value > 100000) {
      const fractionResult = Math.floor(value / 1000);
      formattedNumber = fractionResult + 'k';
    } else {
      const fractionResult = (value / 1000);
      formattedNumber = this.cutDown(fractionResult);
    }
    return formattedNumber;
  }

  private cutDown(num: number): string {
    let strNum = '';
    if (num > 10) {
      strNum = num.toString().slice(0, 4);
    } else {
      strNum = num.toString().slice(0, 3);
    }
    return strNum + 'k';
  }
}

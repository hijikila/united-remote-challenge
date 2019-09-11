/**
 * This Pipe is used to shorten the string passed in args as a value.
 * It takes a big string and transforms the output to a shorten version of it
 *
 * ex: AStringVar | shortenText[(optional):customMaxChars]
 *  if the string passed in args has more than customMaxChars characters
 *  it would cut it down to number of characters passed in args and append the ... at the end
 *  by default customMaxChars is 100
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortenText',
  pure: true
})

export class ShortenTextPipe implements PipeTransform {
  transform(value: string, maxChar: number = 100) {
    if (!value || value.length < maxChar) {
      return value;
    }
    return value.substr(0, maxChar) + '...';
  }
}

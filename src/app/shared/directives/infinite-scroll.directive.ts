import {AfterViewInit, Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {exhaustMap, filter, map, pairwise} from 'rxjs/operators';

@Directive({
  selector: '[appScrollContainer]'
})

export class InfiniteScrollDirective implements AfterViewInit {
  @Output() reachedBottom = new EventEmitter();
  listScrollOb = new Observable();
  positions: ScrollPosition[] = [];
  constructor(private listRef: ElementRef) {
    console.log(listRef);
  }

  // The most suitable lifeCycle hook of a directive
  // where to initialize the scroll behavior and track it
  ngAfterViewInit(): void {
    // Get the observable of the scroll event
    // from the Host of the directive
    this.listScrollOb = fromEvent(this.listRef.nativeElement, 'scroll');
    this.listScrollOb = this.listScrollOb.pipe(
      map((e: any): ScrollPosition => ({ // retrieving the data of the current scroll position from the observable
        clientHeight: e.target.clientHeight,
        scrollHeight: e.target.scrollHeight,
        scrollTop: e.target.scrollTop
      })),
      pairwise(), // Gathering a couple ScrollPosition objects, then pass them to the filter operator
      filter(
        (positions: ScrollPosition[]) => {
          console.log(positions);
          this.positions = positions;
          // checking whether the user is scrolling down and the bottom of the host is reached
          return this.isScrollingDown(positions) && this.hasReachedTheBottom(positions[1]);
        }
      ));

    this.listScrollOb
      .pipe(
        exhaustMap((value, index) => {
          // We reached the bottom of the host port view.
          // Emit the event to the component to load the next page
          this.reachedBottom.emit('bottom reached');
          console.log('load next ');
          return this.listScrollOb;
        })
      )
      .subscribe(() => {});
    console.log(this.listScrollOb);
  }

  // Checks whether the user is scrolling down or up
  // we only care about scrolling down
  // Compares the two objects of ScrollPosition
  private isScrollingDown(positions: ScrollPosition[]) {
    console.log(positions[1].scrollTop > positions[0].scrollTop);
    return positions[1].scrollTop > positions[0].scrollTop;
  }

  // Calculate the percentage of scrolling reached
  // compared to the viewport of the host of our directive
  // the calculations return always a number between 0 (being at the top of the page) and 1 (being at the bottom of the page)
  // We load more data upon reaching 90% of the page
  private hasReachedTheBottom(currentposition: ScrollPosition) {
    console.log('current scroll position ' + (currentposition.scrollTop + currentposition.clientHeight) / currentposition.scrollHeight);
    // technically at the bottom of the page
    return ((currentposition.scrollTop + currentposition.clientHeight) / currentposition.scrollHeight) >= 0.9;
  }
}

interface ScrollPosition {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}

import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {exhaustMap, filter, map, pairwise, startWith} from 'rxjs/operators';

@Directive({
  selector: '[appScrollContainer]'
})

export class InfiniteScrollDirective implements OnInit {
  @Input() reachedBottomCallBack; // the callback responsible of loading more data when the bottom of the page is reached
  @Input() isFirstLoad = false; // to immediately load data upon first entering the page
  private listScrollEvent: Observable<any> = null; // the scroll event observable
  private scrollDownEvent; // the Observable of the scrolling down event
  loading = false;
  constructor(private listRef: ElementRef) { // retrieve the element reference of our hosting element (<ul> in our case)
  }

  // Initialize the scroll behavior and track it
  ngOnInit(): void {
    this.loading = true;
    // Get the observable of the scroll event
    // from the Host of the directive
    this.listScrollEvent = fromEvent(this.listRef.nativeElement, 'scroll');
    this.scrollDownEvent = this.listScrollEvent.pipe(
      map((e: any): ScrollPosition => ({ // retrieving the data of the current scroll position from the observable
        clientHeight: e.target.clientHeight,
        scrollHeight: e.target.scrollHeight,
        scrollTop: e.target.scrollTop
      })),
      pairwise(), // Gathering a couple ScrollPosition objects, then pass them to the filter operator
      filter(
        (positions: ScrollPosition[]) => {
          // checking whether the user is scrolling down and the bottom of the host is reached
          return this.isScrollingDown(positions) && this.hasReachedTheBottom(positions[1]);
        }
      )
    );

    // first data load
    if (this.isFirstLoad) {
      // ignoring the check of scrolling down and reaching the bottom of the page
      // and load data immediately
      // the first time we enter the app
      this.scrollDownEvent = this.scrollDownEvent
        .pipe(
          startWith(
            {clientHeight: 0, scrollHeight: 0, scrollTop: 0},
            {clientHeight: 0, scrollHeight: 0, scrollTop: 0}
          )
        );
    }

    // wait until the the current job of the observable is done
    // so we load more data only once, we reached the bottom of the port view
    // and wait until the current work is done before loading again
    // that's why the exhaust map operator is used
    this.scrollDownEvent
      .pipe(
        exhaustMap((value, index) => {
          console.log('load next ');
          // We reached the bottom of the host port view.
          // Emit the event to the component to load the next page
          return this.reachedBottomCallBack();
        })
      )
      .subscribe(() => {
        this.loading = false;
      });
    console.log(this.listScrollEvent);
  }

  // Checks whether the user is scrolling down or up by Comparing the two objects of ScrollPosition passed in params
  // we only care about scrolling down
  private isScrollingDown(positions: ScrollPosition[]) {
    return positions[1].scrollTop > positions[0].scrollTop;
  }

  // Calculate the percentage of scrolling reached
  // compared to the viewport of the host of our directive
  // the calculations return always a number between 0 (being at the top of the page) and 1 (being at the bottom of the page)
  // We load more data upon reaching 90% of the page
  private hasReachedTheBottom(currentposition: ScrollPosition) {
    // technically at the bottom of the page
    // we reached 0.9 ~ 90% of the port view scroll
    return ((currentposition.scrollTop + currentposition.clientHeight) / currentposition.scrollHeight) >= 0.9;
  }
}

// ScrollPosition model
interface ScrollPosition {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}

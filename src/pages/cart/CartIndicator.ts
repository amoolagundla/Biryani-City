import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {CartService} from '../../services/cart-service';


@Component({
  selector: 'cart-indicator',
  templateUrl: 'CartIndicator.html'
	})
export class CartIndicatorComponent implements OnInit {
  itemAdded = false;
  itemRemoved = false;
  totalCount = 0;
  statusDelay = 500;
  @Output() wasClicked = new EventEmitter();

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    // Show changed status
    this.cartService
      .statusChanged
      .distinctUntilChanged()
      .subscribe(data => {
				console.log(data.totalCount);
        this.totalCount = data.totalCount;
      });
  }

  handleClick($event): void {
    this.wasClicked.emit($event);
  }
}
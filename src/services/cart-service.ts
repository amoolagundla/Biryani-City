import {
    EventEmitter,
    Injectable
} from '@angular/core';


@Injectable()
export class CartService {
    private cart: any[] = [];
    public statusChanged = new EventEmitter < {
        type: string;totalCount: number
    } > ();


    getCart(): any[] {

        return this.cart;
    };

    addCartItem(pizza: any): void {
            this.cart.push(pizza);
						this.statusChanged.emit({
            type: 'add',
            totalCount: this.cart.length
        });
    };
    ClearCart() {
        this.cart = [];
        this.statusChanged.emit({
            type: 'remove',
            totalCount: this.cart && this.cart.length ? this.cart.length : 0
        });
    }
    removeCartItem(index): void {
        this.cart.splice(index, 1);
        this.statusChanged.emit({
            type: 'remove',
            totalCount: this.cart && this.cart.length ? this.cart.length : 0
        });
        //	return this.cart;
    };

    calcTotalSum(): number {
        let sum = 0;

        if(!this.cart || !this.cart.length) {
            return sum;
        }

        for(let i = 0; i < this.cart.length; i = i + 1) {
            sum = sum + (this.cart[i].UnitPrice * this.cart[i].Quantity);
        }

        return sum;
    }
}
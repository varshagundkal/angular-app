import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Auth } from '../../auth/services/auth';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchAutocomplete } from '../../../shared/search-autocomplete/search-autocomplete';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, SearchAutocomplete],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private router = inject(Router)
  searchControl = new FormControl<string>('')

  // Writable Signals::
  quantity = signal<number>(1)
  price = signal<number>(25)

  logout() {
    localStorage.removeItem('accessToken')
    this.router.navigateByUrl('/signin')
  }

  // Helper method to modifty writable signal state
  increment() {
    this.quantity.update(current => current + 1)
  }

  decrement() {
    if(this.quantity() > 1) {
      this.quantity.update(current  => current -1)
    }
  }

  // Computed signals
  totalCost = computed(() => this.quantity() * this.price())

  // selectedVariant = linkedSignal(() => {
  //   source: this.quantity(),
  //   value: (currentQty) => currentQty > 5 ?'bulk box': 'standard box'
  // });

}

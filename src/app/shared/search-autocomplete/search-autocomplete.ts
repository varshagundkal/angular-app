import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-search-autocomplete',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './search-autocomplete.html',
  styleUrl: './search-autocomplete.scss',
})
export class SearchAutocomplete implements OnInit {
  private apiUrl = environment.apiUrl
  private http = inject(HttpClient) 
  
  searchAutoComplete = new FormControl('')
  searchOptions: any[] = []
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.http.get<any>(`${this.apiUrl}/users`).subscribe(res => {
      console.log(res.users)
      this.searchOptions = [...res.users]
    })

    console.log(this.searchOptions)
    // this.filteredOptions = this.searchAutoComplete.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     console.log("value::", value)
    //     const name = typeof value === 'string' ? value : value;
    //     // return name ? this._filter(name):
    //   })
    // )


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchOptions.filter(option => option.toLowerCase().includes(filterValue))

  }
  



  
}

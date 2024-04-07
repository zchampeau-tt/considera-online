import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-muh-auto-text-input',
  templateUrl: './muh-auto-text-input.component.html',
  styleUrls: ['./muh-auto-text-input.component.scss']
})
export class MuhAutoTextInputComponent implements OnInit {
  @Input() public label: string = '';
  @Input() public icon: string = '';
  @Input() public required: boolean = false;
  @Input() public options: string[] = [];
  @Output() public inputValue: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('optionInput') public optionInput: ElementRef<HTMLInputElement> | undefined;

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public formControl = new FormControl('');
  public filteredOptions: Observable<string[]> = new Observable<string[]>();
  public input: string = '';
  public selectedOptions: string[] = [];

  public ngOnInit(): void {
    this.formControl.valueChanges.subscribe(value => {
      if (value !== null)
        this._onInputChange(value);
    });
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (this.options.includes(value) && !this.selectedOptions.includes(value))
      this.selectedOptions.push(value);

    event.chipInput!.clear();
    this.formControl.setValue(null);
  }

  public remove(option: string): void {
    const index = this.selectedOptions.indexOf(option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);

      //this.announcer.announce(`Removed ${fruit}`);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.push(event.option.viewValue);
    if (this.optionInput !== undefined)
      this.optionInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }

  private _onInputChange(value: string): void {
    this.inputValue.emit(value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    console.log(value)
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

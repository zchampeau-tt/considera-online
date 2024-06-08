import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'muh-auto-text-input',
  templateUrl: './muh-auto-text-input.component.html',
  styleUrls: ['./muh-auto-text-input.component.scss']
})
export class MuhAutoTextInputComponent implements OnInit {
  @Input() public label: string = '';
  @Input() public icon: string = '';
  @Input() public required: boolean = false;
  @Input() public multi: boolean = false;
  @Input() public allowNew: boolean = false;
  @Input() public options: string[] = [];
  @Output() public inputValue: EventEmitter<string[]> =
    new EventEmitter<string[]>();
  @Output() public inputValueIndex: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() public onInputChange: EventEmitter<void> =
    new EventEmitter<void>();
  @ViewChild('optionInput') public optionInput: ElementRef<HTMLInputElement> | undefined;

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public formControl: FormControl<string | null> = new FormControl('');
  public filteredOptions: Observable<string[]> = new Observable<string[]>();
  public input: string = '';
  public selectedOptions: string[] = [];

  public ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value: string | null) => {
      if (value !== null)
        this._onInputChange();
    });
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this._filter(value || '')),
    );
  }

  public add(event: MatChipInputEvent | MatAutocompleteSelectedEvent): void {
    const values: string[] = (event instanceof MatAutocompleteSelectedEvent ? event.option.viewValue : event.value || '')
      .trim()
      .split(',');

    if (!(event instanceof MatAutocompleteSelectedEvent))
      event.chipInput!.clear();

    values.forEach((value: string) => {
      let trimmed = value.trim();
      if ((this.options.includes(trimmed) || this.allowNew) && !this.selectedOptions.includes(trimmed))
        this.selectedOptions.push(trimmed);
    });

    this.onInputChange.emit();
  }

  public load(): void {
  }

  public remove(option: string): void {
    const index = this.selectedOptions.indexOf(option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
  }

  public singleSelected(event: MatAutocompleteSelectedEvent): void {
    const value: string = event.option.viewValue;
    this.selectedOptions = [value];

    if (this.optionInput !== undefined)
      this.optionInput.nativeElement.value = '';

    this._onInputChange();
    this.inputValueIndex.emit(this.options.indexOf(value));
  }

  public clear(): void {
    this.selectedOptions = [];
    if (this.optionInput !== undefined)
      this.optionInput.nativeElement.value = '';
  }

  private _onInputChange(): void {
    this.inputValue.emit(this.selectedOptions);
  }

  private _filter(value: string): string[] {
    return this.options.filter((option: string) => option.toLowerCase().includes(value.toLowerCase()));
  }
}

import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showRegList: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleRegList(): void{
    this.showRegList = !this.showRegList;
    this.subject.next(this.showRegList);
  }



  onToggle(): Observable<any>{
    return this.subject.asObservable();
  }
}

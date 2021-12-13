import { Injectable } from '@angular/core';
import { TASKINFO } from 'src/TASKINFO';
import { LOGIN } from 'src/Logins';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from 'src/member';

const httpOptions = {
  headers :new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class RegService {
  private apiUrl = 'http://localhost:3000/tasks'
  private urlforselectedTask = 'http://localhost:3000/selectedTask'
  private urlforlogins = 'http://localhost:3000/logins'
  private urlformembers = 'http://localhost:3000/members'

  constructor(private http : HttpClient) { }

  getList() : Observable<TASKINFO[]> {
    return this.http.get<TASKINFO[]>(this.apiUrl);
  }

  deleteTASKINFO(statToDelete: TASKINFO): Observable<TASKINFO>
  {
    const url = `${this.apiUrl}/${statToDelete.id}`;
    return this.http.delete<TASKINFO>(url);
  }

  updateList(statToUpdate: TASKINFO): Observable<TASKINFO> {
    const url = `${this.apiUrl}/${statToUpdate.id}`;

    //statToUpdate.timeofpay = new Date();
    return this.http.put<TASKINFO>(url, statToUpdate, httpOptions);

    
  }

  addToList(statToAdd: TASKINFO):Observable<TASKINFO>{
    return this.http.post<TASKINFO>(this.apiUrl,statToAdd, httpOptions);
  }

  fixselectedTask(selectedTask: TASKINFO):Observable<TASKINFO>{
    let main: TASKINFO = {"id": 2,
    "title": "",
    "description_": "",
    "reporter":"",
    "assignee": "",
    "level": "",
    "isCompleted": false,
    "completionid": 0,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "prioritylevel": "",
    "priorityid": 2,
    "expectedcompletedate": new Date(),
    "withinSLA": false,
    "comments": []
    };

    this.getselectedTask().subscribe((listReturn) => {
      main = listReturn})
    const url = `${this.urlforselectedTask}/${main.id}`;
    console.log(main.createdAt)

    this.http.delete<TASKINFO>(url);
    console.log("Delete happened!")
    return this.http.post<TASKINFO>(this.urlforselectedTask,selectedTask, httpOptions);
    
  }

  getselectedTask() : Observable<TASKINFO> {
    return this.http.get<TASKINFO>(this.urlforselectedTask);
  }

  getLogins() : Observable<LOGIN[]> {
    return this.http.get<LOGIN[]>(this.urlforlogins);
  }

  getMembersList() : Observable<Member[]> {
    return this.http.get<Member[]>(this.urlformembers)
  }
}

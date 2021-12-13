import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { TASKINFO } from 'src/TASKINFO';
import { RegService } from 'src/app/services/reg.service';
import { Member } from 'src/member';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css'],
})
export class RegFormComponent implements OnInit {

  @Output() onNewReg: EventEmitter<TASKINFO> = new EventEmitter();
  members : Member[] = []


  datelist: Date[] = [];
  title: string = '';
  description_: string = '';
  reporter: string = '';
  assignee: string = '';
  level: string = '';
  isCompleted: boolean = false;
  prioritylevel: string = '';
  expectedcompletedate : Date = this.datelist[0];
  hasPaid: boolean = false;
  showRegList?: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, private regService: RegService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showRegList = value));
  }

  ngOnInit(): void {

    this.regService.getMembersList().subscribe((resultList) => this.members = resultList);
  }

  addNewReg(reg: TASKINFO){
    this.regService.addToList(reg).subscribe()
  }

  onSubmit() {

    console.log(this.expectedcompletedate);

    if (!this.title || !this.description_ || !this.reporter || !this.assignee || !this.prioritylevel) {

      alert('Please enter all valid information about the Task. All fields are mandatory.');
      return;
    } 
    
    if (this.reporter == this.assignee) {
      alert('One can not assign a task to himself. Ensure the reporter and responsible fields are distinct');
      return;
    }

    

    /*if (this.expectedcompletedate.getTime() <= new Date().getTime()) {
      alert('The Due Date for a task must be at least 24 hours from the the date of creation.')
      return;
    }*/
    
  

    const newRegister = {
      title: this.title,
      description_: this.description_,
      reporter: this.reporter,
      assignee: this.assignee,
      level: "New",
      isCompleted: this.isCompleted,
      completionid: this.isCompleted ? 0 : 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      prioritylevel: this.prioritylevel,
      priorityid: this.prioritylevel == 'P1' ? 1 : (this.prioritylevel == 'P2' ? 2 : 3),
      expectedcompletedate: this.expectedcompletedate,
      withinSLA: true,
      comments: []
    };

    this.addNewReg(newRegister);


    //this.onNewReg.emit(newRegister);

    alert('Task Creation successful')

    this.title = '';
    this.description_ = '';
    this.reporter = '';
    this.assignee = '';
    this.level = '';
    this.prioritylevel = '';
    this.expectedcompletedate = this.datelist[0];
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegService } from './../../services/reg.service';
import { TASKINFO } from 'src/TASKINFO';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css'],
})
export class RegisterListComponent implements OnInit {
  regs: TASKINFO[] = [];

  
  constructor(private regService: RegService) { }

  @Input() regList?: TASKINFO;
  faTimes = faTimes;
  faExclamationCircle = faExclamationCircle;
  pathtoGo: string = '';
  selectedTask :TASKINFO = this.regs[0];

  @Output() onTogglePaid: EventEmitter<TASKINFO> = new EventEmitter();
  @Output() onDeleteReg: EventEmitter<TASKINFO> = new EventEmitter();
  @Output() onClickView: EventEmitter<TASKINFO> = new EventEmitter();

  

  
  onToggle(HasPaid?: TASKINFO) {
    this.onTogglePaid.emit(HasPaid);
    
    
  }


  onDelete(statToDelete?: TASKINFO) {
    this.onDeleteReg.emit(statToDelete);
  }

  toggleRegList(task: TASKINFO) {
    this.pathtoGo = '/registered';
    this.onClickView.emit(task)
    this.selectedTask = task;
  }

  

  //function to implement on initializing this component
  //get registered users from json server and sort by timeofpay if hasPaid is true else by regDate.
  ngOnInit(): void {
    this.regService
      .getList()
      .subscribe((listReturn) => {
        this.regs = listReturn
        for (let reg of this.regs) {
          if (reg.isCompleted) {
            if (new Date(reg.updatedAt) > new Date(reg.expectedcompletedate)) {
              reg.withinSLA = false
            } else { reg.withinSLA = true }
          } else {
            if (new Date() > new Date(reg.expectedcompletedate)) {
              reg.withinSLA = false
            } else { reg.withinSLA = true}
          }

          
        }

        this.regs.sort(function (a, b) {
          return new Date(a.expectedcompletedate).getDate() - new Date(b.expectedcompletedate).getDate()
        }).sort(function (a, b) {
          return a.priorityid - b.priorityid
        }).sort(function (a, b) {
          return b.completionid - a.completionid
        })
      });



  }

  addSelectedTask(reg: TASKINFO){
    this.regService.fixselectedTask(reg).subscribe((reg) => {
      this.selectedTask = reg
    })

    console.log("Add Selected Happened!")

  }

  
}

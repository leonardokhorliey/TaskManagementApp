import { RegService } from './../../services/reg.service';
import { Component, OnInit } from '@angular/core';
import { TASKINFO } from 'src/TASKINFO';
import { RegisterListComponent } from '../register-list/register-list.component';
import { commentLogs } from 'src/commentLogs';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})

//initialize RegisteredComponent for the list of registered users page.
export class RegisteredComponent implements OnInit {
  taskHolder: TASKINFO;
  task : TASKINFO;
  updateTaskStatusCount : number = 0;
  failedcommit: boolean = false;
  pathtoGo: string = "/registered";
  comment: commentLogs = {text: '', createdAt: new Date()};
  showComments = false;
  
  
  
  

  constructor(private regService: RegService, private regListComponent: RegisterListComponent) { 
    this.task = regListComponent.selectedTask;
    this.taskHolder = this.task;
  }

  ngOnInit(): void {
    this.regService
      .getselectedTask()
      .subscribe((resultTask) => {
        this.task = resultTask
      })

    var taskHolder = this.task;

  }

  updateLevel() {
    
    if (this.updateTaskStatusCount > 0) {
      alert("You can not update a Task more than once at a time.");
      return;
    }
    this.updateTaskStatusCount += 1
    
    let tasklevels = ["New", "In Progress", "QA", "Done"];
    let levelkey = tasklevels.indexOf(this.task.level);
    if (levelkey == 3) {
      alert("Task is already completed and can no longer be updated");
    } else {
      levelkey += 1;
      this.task.level = tasklevels[levelkey];
      
      if (this.task.level == 'Done') {
        this.task.isCompleted = true;
        this.task.completionid = 0;
      }

      

      this.regService.fixselectedTask(this.task).subscribe();

      alert("Task Status successfully updated to " + this.task.level);
    }

    
    

    
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  saveComment() {
    if(this.task.isCompleted && this.comment.text != '') {
      alert("Comment can not be added to a completed task.")
    } else {
      this.comment.createdAt = new Date();
      this.task.comments.push(this.comment);
      
    }
  }

  commit(){
    if (this.failedcommit) {
      alert("You can not make changes to a Task within one hour. Come back after an hour from the last update.")
      return;
    }
    if (this.taskHolder == this.task) {
      alert("You have not made any changes to be committed.")
      return;
    }
    
    this.task.updatedAt = new Date();
    this.regService.updateList(this.task).subscribe();
    
  }


  checkChanges(){
    if (new Date().getTime() - new Date(this.task.updatedAt).getTime() < 3600000) {

      this.failedcommit = true;
      console.log(this.failedcommit)
    } else {
      this.failedcommit = false;
      this.pathtoGo = "/regList"
    }
    
  }



  // //function to handle deletion of a registered member and removing from the json server
  // deleteReg(statToDelete: REG) {
  //   this.regService
  //     .deleteReg(statToDelete)
  //     .subscribe(
  //       () => (this.regs = this.regs.filter((t) => t.id !== statToDelete.id))
  //     );
  // }

  // //function to implement an update to payment status when a registered member is toggled
  // //sorting is done as well as in ngInit()
  // paymentStat(togglePaymentStat: REG) {
  //   togglePaymentStat.hasPaid = true;

  //   this.regService.updateList(togglePaymentStat).subscribe();

  //   this.regs.sort(function (a, b) {
  //     return new Date(b.timeofpay).getTime() - new Date(a.timeofpay).getTime()
  //   }).sort(function (a, b) {
  //     return (!a.hasPaid && !b.hasPaid) ? new Date(b.regDate).getTime() - new Date(a.regDate).getTime() : 0
  //   })
  // }

  

}




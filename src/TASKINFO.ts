import { commentLogs } from "./commentLogs";

export interface TASKINFO {
    id?: number,
    title: string,
    description_: string,
    reporter:string,
    assignee: string,
    level: string,
    isCompleted:boolean,
    completionid: number,
    createdAt: Date,
    updatedAt: Date,
    prioritylevel: string,
    priorityid: number,
    expectedcompletedate: Date,
    withinSLA: boolean
    comments: commentLogs[]
}

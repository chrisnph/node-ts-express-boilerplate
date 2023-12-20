import { Document } from "mongoose";

declare namespace TasksTypes {
  export interface mongoTasks extends Document {
    username: string;
    password: string;
    name: {
      first: string;
      last: string;
    };
    avatar: string;
  }

  export interface responseObject {
    status: string;
    data?: mongoTasks;
    error?: string;
  }
} 

export default TasksTypes;

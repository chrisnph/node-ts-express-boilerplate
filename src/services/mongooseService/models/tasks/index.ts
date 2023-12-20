import { Schema, model } from "mongoose";
import TasksTypes from "./typings";

const tasksSchema: Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "Tasks",
  }
);

const Tasks = model<TasksTypes.mongoTasks>("Task", tasksSchema);

export default Tasks;

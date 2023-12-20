import tasksServiceTypes from "../typings";
import errorHandler from "../../../utils/errorHandler";
import Tasks from "../../mongooseService/models/tasks";

const add = async ({ title, username }: tasksServiceTypes.add) => {
  try {
    const task = new Tasks({
      title,
      username,
      status: "incomplete",
    });

    const addTask = await task.save();


    return { status: "ok", data: addTask };
  } catch (error: any) {
    errorHandler({
      message: error.message || "failed to add task",
      code: 500,
      others: error.stack,
    });
  }
};

export default add;

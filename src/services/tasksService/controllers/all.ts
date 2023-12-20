import tasksServiceTypes from "../typings";
import errorHandler from "../../../utils/errorHandler";
import Tasks from "../../mongooseService/models/tasks";

const all = async (username: string) => {
  try {
    const taskList = await Tasks.find({ username });

    return {
      status: "ok",
      data: taskList,
    };
  } catch (error: any) {
    errorHandler({
      message: error.message || "failed to list task",
      code: 500,
      others: error.stack,
    });
  }
};

export default all;

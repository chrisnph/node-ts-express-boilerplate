import tasksServiceTypes from "../typings";
import errorHandler from "../../../utils/errorHandler";
import Tasks from "../../mongooseService/models/tasks";

const remove = async ({ id, username }: tasksServiceTypes.remove) => {
  try {
    const getTask = await Tasks.find({
      _id: id,
      username,
    });

    if (getTask.length < 1) {
      return {
        status: "error",
        error: `Task does not exist`,
      };
    }

    const deleteTask = await Tasks.findByIdAndDelete(id);

    return {
      status: "ok",
      data: deleteTask,
    };
  } catch (error: any) {
    errorHandler({
      message: error.message || "failed to add task",
      code: 500,
      others: error.stack,
    });
  }
};

export default remove;

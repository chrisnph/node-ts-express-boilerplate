import tasksServiceTypes from "../typings";
import errorHandler from "../../../utils/errorHandler";
import Tasks from "../../mongooseService/models/tasks";

const edit = async (editReqBody: tasksServiceTypes.editReqBody) => {
  try {
    const { id } = editReqBody;

    const getTask = await Tasks.find({
      _id: id,
      username: editReqBody.username,
    });

    if (getTask.length < 1) {
      return {
        status: "error",
        error: `Task does not exist`,
      };
    }

    const editTask = await Tasks.findByIdAndUpdate(id, editReqBody, {
      new: true,
    });

    return { data: editTask };
  } catch (error: any) {
    errorHandler({
      message: error.message || "failed to add task",
      code: 500,
      others: error.stack,
    });
  }
};

export default edit;

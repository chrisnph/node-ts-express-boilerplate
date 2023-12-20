declare namespace tasksServiceTypes {
  export interface task {
    title: string;
    status: string;
    username: string;
  }

  export interface add {
    title: string;
    username: string;
  }

  export interface editReqBody {
    [key: string]: string | undefined;
  }

  export interface edit {
    id: string;
    title?: string;
    status?: string;
  }

  export interface remove {
    id: string;
    username: string;
  }
}

export default tasksServiceTypes;

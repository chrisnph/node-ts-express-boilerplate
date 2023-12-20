declare namespace authServiceTypes {
  export interface register {
    username: string;
    password: string;
    name: {
      first: string;
      last: string;
    };
    avatar: string;
  }

  export interface login {
    username: string;
    password: string;
  }
}

export default authServiceTypes;

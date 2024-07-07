export interface IUserData {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  pic: string;
  token: string;
}

export interface IAuthStore {
  userData?: IUserData | null;
}

export interface IActions {
  actions: {
    setUserData: (data: IUserData) => void;
    resetStore: () => void;
  };
}

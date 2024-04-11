import axios from "axios";

const axiosLiveInstance = axios.create({
  withCredentials: true,
  baseURL: "https://alanbase.vercel.app/api",
});

export const Users = {
  getUsersList: (page: number, limit: number) => {
    return axiosLiveInstance.get<GetUsersListResponseType>(
      `/users?page=${page}&limit=${limit}`,
    );
  },
};

export type UserDataType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string;
};

export type MetaDataType = {
  from: number;
  to: number;
  total: number;
};

export type GetUsersListResponseType = {
  data: Array<UserDataType>;
  meta: MetaDataType;
};

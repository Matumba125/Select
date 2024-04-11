import { useState } from "react";
import { MetaDataType, UserDataType, Users } from "../api/userSelectApi";

type ControllerData = {
  usersList: Array<UserDataType>;
  loadMoreUsers: () => void;
  isLoading: boolean;
};

export const useSelectController = (): ControllerData => {
  const [usersList, setUsersList] = useState<Array<UserDataType>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentMeta, setCurrentMeta] = useState<MetaDataType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMoreUsers = async () => {
    if (!currentMeta || currentMeta.total > usersList.length || !isLoading) {
      try {
        setIsLoading(true);
        const res = await Users.getUsersList(currentPage + 1, 50);
        if (res.data.meta.to !== usersList[usersList.length - 1].id) {
          setUsersList((prevState) => [...prevState, ...res.data.data]);
          setCurrentPage((prevState) => prevState + 1);
          setCurrentMeta(res.data.meta);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { usersList, loadMoreUsers, isLoading };
};

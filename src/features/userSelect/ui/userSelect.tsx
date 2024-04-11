import React, { useRef, MouseEvent, useState } from "react";
import { useSelectController } from "../model/useSelectController";
import { UserDataType } from "../api/userSelectApi";
import { ReactComponent as ArrowDown } from "../../../shared/icons/arrowDown.svg";
import style from "./userSelect.module.css";
import Option from "./option/option";

const UserSelect = () => {
  const { usersList, loadMoreUsers, isLoading } = useSelectController();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<UserDataType>();
  const rootRef = useRef<HTMLDivElement>(null);

  const handleOpenSelect = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    loadMoreUsers();
    setOpen((prevState) => !prevState);
  };

  const handleOptionClick = (
    event: MouseEvent<HTMLDivElement>,
    user: UserDataType,
  ) => {
    event.stopPropagation();
    if (selectedOption?.id === user.id) {
      setSelectedOption(undefined);
      setOpen(false);
      return;
    }
    setSelectedOption(user);
    setOpen(false);
  };

  const onScroll = () => {
    if (rootRef.current) {
      if (
        rootRef.current.scrollHeight - rootRef.current.scrollTop < 500 &&
        !isLoading
      ) {
        loadMoreUsers();
      }
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <div className={style.wrapper}>
        <div onClick={handleOpenSelect} className={style.selectWrapper}>
          <div>
            {selectedOption
              ? `${selectedOption.last_name} ${selectedOption.first_name}, ${selectedOption.job}`
              : ""}
          </div>
          <ArrowDown />
        </div>
        {open && (
          <div className={style.listWrapper} ref={rootRef} onScroll={onScroll}>
            {usersList.map((user) => {
              return (
                <Option
                  key={user.id}
                  user={user}
                  handleOptionClick={handleOptionClick}
                  selectedOption={selectedOption}
                />
              );
            })}
            {isLoading && <div>Loading...</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelect;

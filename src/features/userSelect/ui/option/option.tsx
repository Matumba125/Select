import React, { FC, MouseEvent } from "react";
import style from "../userSelect.module.css";
import Avatar from "../../../../shared/UIKit/avatar/ui/avatar";
import { UserDataType } from "../../api/userSelectApi";

type OptionPropsType = {
  selectedOption?: UserDataType;
  user: UserDataType;
  handleOptionClick: (
    event: MouseEvent<HTMLDivElement>,
    user: UserDataType,
  ) => void;
};

const Option: FC<OptionPropsType> = ({
  selectedOption,
  user,
  handleOptionClick,
}) => {
  return (
    <div
      className={
        selectedOption?.id === user.id ? style.selectedItem : style.listItem
      }
      onClick={(event) => handleOptionClick(event, user)}
    >
      <Avatar lastName={user.last_name} />
      <span>
        {user.last_name} {user.first_name}, {user.job}
      </span>
    </div>
  );
};

export default Option;

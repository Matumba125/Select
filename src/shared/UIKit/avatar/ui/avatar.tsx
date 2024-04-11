import React, { FC } from "react";
import style from "./avatar.module.css";

type AvatarPropsType = {
  lastName: string;
};

const Avatar: FC<AvatarPropsType> = ({ lastName }) => {
  return <div className={style.avatar}>{lastName[0]}</div>;
};

export default Avatar;

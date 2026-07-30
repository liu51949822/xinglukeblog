import { FC } from "react";
import { MessagePage } from "./message";
import  Background  from '../background/background';

export const Message : FC = () => {
  return (
    <div>
      <Background />
      <MessagePage />
    </div>
  )
}
export default Message;

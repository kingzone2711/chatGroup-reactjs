import React from "react";
 import moment from "moment";
import { Comment, Image  } from "semantic-ui-react";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message__self" : "";
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

const isImage = message => {
  return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
};
const Message = ({ message, user }) => (
  console.log(message),
  <Comment>
    <Comment.Avatar  />
    <Comment.Content className={isOwnMessage(message, user)} >
      <Comment.Author as="a">{message.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timeStamp)}</Comment.Metadata>
      {isImage(message) ? (
        <Image src={message.image} className="message__image" />
      ) : (
        <Comment.Text>{message.content}</Comment.Text>
      )}
      <Comment.Text>{message.message}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Message;


import React from 'react';
import ChatItem from '../ChatItem';

const MainSection = (props) => {
  return (
    <div>
      <ul>
        {props.messages.map((message, i) => {
          return <ChatItem message={message} key={i} />;
        })}
      </ul>
    </div>
  );
};

export default MainSection;

import React from 'react';
import UserPanel from './UserPanel';
import Channels from './Channels'
import { Menu } from "semantic-ui-react";


export default function SidePanel(props) {
  const { currentUser } = props;
  return (
    <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "grey", fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser}></Channels>
      </Menu>
  )
}

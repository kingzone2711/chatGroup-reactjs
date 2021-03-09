import React,{useState} from 'react'
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";




export default function UserPanel() {

const [Name,setName]=useState("user");

 const history = useHistory()
 const dropdownOptions = () => [
        {
          key: "user",
          text: (
            <span>
              Signed in as <strong>{Name}</strong>
            </span>
          ),
          disabled: true
        },
        {
          key: "avatar",
          text: <span>Change Avatar</span>
        },
        {
          key: "signout",
          text: <span onClick={handleSignout}>Sign Out</span>
        }
      ];
      
const handleSignout=()=>{
  firebase
  .auth()
  .signOut()
  .then(() => history.push("/login" )
  );
}

  return (
   
    <Grid style={{ background: "grey" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Chat</Header.Content>
            </Header>
          </Grid.Row>

          {/* User Dropdown  */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>{Name}</span>}
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
  )
}

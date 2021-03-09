import './App.css';
import { Grid } from "semantic-ui-react";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { connect } from "react-redux";


function App({currentUser,currentChannel}) {
 
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <SidePanel currentUser={currentUser} />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages key={currentChannel && currentChannel.id} currentUser={currentUser} currentChannel={currentChannel} />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel:state.channel.currentChannel
});
export default connect(mapStateToProps)(App);

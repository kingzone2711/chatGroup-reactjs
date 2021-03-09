import React from 'react'
import { Segment, Button, Input } from "semantic-ui-react";
import FileModal from "./FileModal"
import { uuid } from 'uuidv4';
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

class MessagesForm extends React.Component {
    state = {
        storageRef: firebase.storage().ref(),
        message: "",
        user:this.props.currentUser,
        channel:this.props.currentChannel,
        messagesRef: this.props.messagesRef,
        isLoading:false,
        errors:[],
        modal:false,
        uploadTask:null,
        uploadState:""
    }
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    createMessage = (fileUrl=null) => {
        const message={
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
            user:{
                id:this.state.user.uid,
                name:this.state.user.displayName,
                photo:this.state.user.photoURL
            },
            message:this.state.message
        }
        if(fileUrl!==null){
            message["image"]=fileUrl
          
        }
        else{
            message["content"] = this.state.message;
        }
       
        return message;
    }

    sendMessage = () => {
        const {message,channel,messagesRef}=this.state;
        if( message && channel )
        {
            this.setState({isLoading:true})
            messagesRef
            .child(channel.id)
            .push()
            .set(this.createMessage())
            .then(()=>{
                this.setState({ message:"", isLoading: false, errors: [] });
            })
            .catch(err => {
                console.error(err);
                this.setState({
                  isLoading: false,
                  errors: this.state.errors.concat(err)
                });
              });
        }
        else {
            this.setState({
              errors: this.state.errors.concat({ message: "Add a message" })
            });
          }
      
    }
    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    uploadFile = (file, metadata) => {
        const pathToUpload = this.state.channel.id;
        const ref = this.props.messagesRef;
        const filePath = `chat/public/${uuid()}.jpg`;
        this.setState({
            uploadState: "uploading",
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        }, () => {
            this.state.uploadTask.on("state_changed",
                snap => {
                    const percentUploaded = Math.round(
                        (snap.bytesTransferred / snap.totalBytes) * 100
                    )
                    this.setState({ percentUploaded })
                },
                err => {
                    console.error(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        uploadState: "error",
                        uploadTask: null
                    });
                },
                () => {
                    this.state.uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(downloadUrl => {
                            this.sendFileMessage(downloadUrl, ref, pathToUpload);
                        })
                        .catch((err) => {
                            console.log(err)
                            this.setState({ errors: this.state.errors.concat(err) })
                        })
                })
        })

    }
    sendFileMessage = (fileUrl, ref, pathToUpload ) =>{
        ref
        .child(pathToUpload)
        .push()
        .set(this.createMessage(fileUrl))
        .then(
            this.setState({uploadState:"done"})
        )
        .catch((err)=>{
            console.log(err)
            this.setState({errors:this.state.errors.concat(err)})
        })
    }
    render() {
      //  console.log(this.state.user)
        const { errors, message, loading,channel,modal } = this.state;
        return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    onChange={this.handleChange}
                    value={message}
                    style={{ marginBottom: "0.7em" }}
                    label={<Button icon={"add"} />}
                    labelPosition="left"
                    className={
                        errors.some(error => error.message.includes("message"))
                          ? "error"
                          : ""
                      }
                    placeholder="Write your message"
                />
                <Button.Group icon widths="2">
                    <Button
                         onClick={this.sendMessage}
                        disabled={loading}
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                    />
                    <Button
                         color="teal"
                         onClick={this.openModal}
                         content="Upload Media"
                         labelPosition="right"
                         icon="cloud upload"
                    />
                </Button.Group>
                <FileModal
                    modal={modal}
                    closeModal={this.closeModal}
                    uploadFile={this.uploadFile}
                />
            </Segment>
        )
    }
}
export default MessagesForm
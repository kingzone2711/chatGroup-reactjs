import React,{useState} from 'react'
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link,useHistory } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false);
  const [errors,setError]=useState([]);
  const history = useHistory()

   const displayErrors = (errors) =>
      errors.map((error, i) => <p key={i}>{error.message}</p>);

  const isFormValid = (email, password ) => email && password;

  const handleSubmit = event => {
    event.preventDefault();
    if (isFormValid(email,password)) {
      setError([]);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then(signedInUser => {
         // console.log(signedInUser);
          history.push("/")
        })
        .catch(err => {
          setError([{
            err
          }])
          setLoading(false)
        });
    }
  };


  // const handleInputError = (errors, inputName) => {
  //   console.log(inputName)
  //   return errors.some(error => error.message.toLowerCase().includes(inputName))
  //     ? "error"
  //     : "";
  // };

  
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h1" icon color="violet" textAlign="center">
        <Icon name="code branch" color="violet" />
        Login to Chat
      </Header>
      <Form onSubmit={handleSubmit} size="large">
        <Segment stacked>
          <Form.Input
            fluid
            name="email"
            icon="mail"
            iconPosition="left"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
           
            type="email"
          />

          <Form.Input
            fluid
            name="password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            
            type="password"
          />

          <Button
            disabled={loading}
            className={loading ? "loading" : ""}
            color="violet"
            fluid
            size="large"
          >
            Submit
          </Button>
        </Segment>
      </Form>
      {errors.length > 0 && (
        <Message error>
          <h3>Error</h3>
          {displayErrors(errors)}
        </Message>
      )}
      <Message>
        Don't have an account? <Link to="/register">Register</Link>
      </Message>
    </Grid.Column>
  </Grid>
  )
}

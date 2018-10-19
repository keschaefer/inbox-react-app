import React, { Component } from 'react';
import './App.css';
import Message from './Components/Message';
import MessageList from './Components/MessageList';
import Toolbar from './Components/Toolbar';

class App extends Component {
  constructor() {
    super()
      this.state = {
        messages: [],
        composeMessage: true,
      }
    }

  async componentDidMount() {
      let result = await fetch("http://localhost:8082/api/messages")
      let data =  await result.json()
      console.log("data", data)
      this.setState({
          messages: data,
        })
      }  

  
  hideMessage = () => {
    this.setState({composeMessage: !(this.state.composeMessage)}) 
    }

  patch = async (id, command, attribute, value) => {
    var patch = {
      messageIds: [id],
      command: command,
      [attribute]: value,
    }

    const response = await fetch("http://localhost:8082/api/messages") {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    
      const posted = await response.json()
      this.setState({
        messages: posted
      }) 
    }
  

  markStarred = () => {
    this.patch([event.target.id], 'read', 'read', true)
  }  

  render() {
    return (
      <div className="App body">
        <header className="App-header">
         <Toolbar hideMessage ={this.hideMessage} composeMessage={this.state.composeMessage}/>
         <Message composeMessage={this.state.composeMessage}/>
         <MessageList messages = {this.state.messages} markStarred = {this.markStarred}/>
       
         
        </header>
      </div>
    );
  }
}

export default App;

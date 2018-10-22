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
        selected: [],
        read: [],
        unRead: [],
        totalUnRead: 0,
      }
    }

  async componentDidMount() {
      let result = await fetch("http://localhost:8082/api/messages")
      let data =  await result.json()
      console.log("data", data)
      this.setState({
          messages: data,
          selected: data.filter(i => {
            return i.selected === true
          })
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

    const response = await fetch("http://localhost:8082/api/messages", {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      
      const posted = await response.json()
      this.setState({
        messages: posted
      }) 
    }
  

  markStarred = (event) => {
    this.patch([event.target.id], 'star', 'starred')
  }  

  markSelected = (event) => {
   this.patch([event.target.id], 'select', 'selected')
  }

  markRead = () => {
    let readArr = this.state.messages.filter(i => {
      return i.selected === true
    }) 
    for (let i = 0; i < readArr.length; i++) {
      this.patch([readArr[i].id], 'read', 'read', true)
    }
      this.setState({
      read: readArr,
    })
  }
  
  markUnRead = () => {
    let unReadArr = this.state.messages.filter(i => {
      return i.selected === true
    }) 
    for (let i = 0; i < unReadArr.length; i++) {
      this.patch([unReadArr[i].id], 'read', 'read', false)
      console.log(this.state.messages)
    }
    this.setState({
      unRead: unReadArr,
    })
  }
      
  deleteMessage = () => {
      this.state.messages.filter(i => {
        if (i.selected === true) {
          this.patch([i.id], 'delete')
        }
      }) 
  } 
  

  render() {
    return (
      <div className="App body">
        <header className="App-header">
         <Toolbar hideMessage ={this.hideMessage} composeMessage={this.state.composeMessage} markRead = {this.markRead} markUnRead = {this.markUnRead} messages = {this.state.messages} deleteMessage = {this.deleteMessage}/>
         <Message composeMessage={this.state.composeMessage}/>
         <MessageList messages = {this.state.messages} markStarred = {this.markStarred}  markSelected = {this.markSelected}/>
       
         
        </header>
      </div>
    );
  }
}

export default App;

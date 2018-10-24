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
        tempSubject: '',
        tempBody: '',
      }
    }

  async componentDidMount() {
    let result = await fetch("http://localhost:8082/api/messages")
    let data =  await result.json()
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
    
  selectAll = () => {
    let selected = this.state.messages.filter(i => {
      return i.selected === true
    })
    if (selected.length === this.state.messages.length) {
      this.state.messages.map(i => {
        this.patch([i.id], 'allFalse')
      })
    } else {
      this.state.messages.map(i => {
        this.patch([i.id], 'allTrue')
      })
    }
  }

  saveSubject = (event) => {
    event.preventDefault()
    this.setState({
      tempSubject: event.target.value
    })
  }
    
  saveBody = (event) => {
    event.preventDefault()
    this.setState({
      tempBody: event.target.value
    })
  }

  addMessage = () => {
    let tempMessage = {
      subject: this.state.tempSubject,
      body: this.state.tempBody,
      read: false,
      starred: false,
      selected: false,
      labels: [],
    }
    fetch ("http://localhost:8082/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(tempMessage)
    })

    .then(response => (response.json()))
    .then(response => {
      this.setState({
        messages: [...this.state.messages, response]
      })
    })
  }
      
  AddLabel = (event) => {
    let selected = this.state.messages.filter(i => {
      return i.selected === true
    })
    selected.map(i => {
      this.patch([i.id], 'addLabel', 'label', event.target.value)
    })
  }
    
  RemoveLabel = (event) => {
    let selected = this.state.messages.filter(i => {
      return i.selected === true
    })
    selected.map(i => {
      this.patch([i.id], 'removeLabel', 'label', event.target.value)
    })
  }

  render() {
    return (
      <div className="App body">
        <header className="App-header"></header>
          <Toolbar 
          hideMessage ={this.hideMessage} 
          composeMessage={this.state.composeMessage} 
          markRead = {this.markRead} 
          markUnRead = {this.markUnRead} 
          messages = {this.state.messages} 
          deleteMessage = {this.deleteMessage} 
          selectAll = {this.selectAll} 
          addLabel = {this.AddLabel} 
          removeLabel = {this.RemoveLabel}
          allSelected = {this.state.allSelected}
          someSelected = {this.state.someSelected}
          noneSelected = {this.state.noneSelected}
          />
          <Message 
          composeMessage={this.state.composeMessage} 
          addMessage = {this.addMessage} 
          saveSubject = {this.saveSubject} 
          saveBody = {this.saveBody}
          />
          <MessageList 
          messages = {this.state.messages} 
          markStarred = {this.markStarred}  
          markSelected = {this.markSelected}
          /> 
      </div>
    );
  }
}


export default App;

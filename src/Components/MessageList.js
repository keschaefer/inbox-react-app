import React from 'react';

const MessageList = (props) => {
   return props.messages.map(i => {
      return (
         <div id = {i.id}>
         <div className= {`row message ${i.read ? 'read' : 'unread'} ${i.selected ? 'selected' : ''}`}>
            <div className="col-xs-1">
               <div className="row">
                  <div className="col-xs-2">
                     <input id = {i.id} onClick = {props.markSelected} type="checkbox" checked = {`${i.selected ? 'defaultselected' : ''}`}></input>
                  </div>
                  <div className="col-xs-2">
                     <i id = {i.id} onClick = {props.markStarred} className= {`star fa fa-star${i.starred ? '-o' : ''}`}></i>
                  </div>
               </div>
            </div>
            <div className="col-xs-11">
               <span className="label label-warning">{i.labels[0]}</span>
               <span className="label label-warning">{i.labels[1]}</span>
               <span className="label label-warning">{i.labels[2]}</span>
               <span>Subject: {i.subject}</span>
            </div>
         </div>
         <div className="row message-body hidden">
            <div className="col-xs-11 col-xs-offset-1">
            {i.body}
            </div>
         </div>
      </div>

   )
})
}



export default MessageList;
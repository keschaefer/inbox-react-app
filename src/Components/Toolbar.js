import React from 'react';

const Toolbar = (props) => {
   
   let count = 0
   let plural = true
    props.messages.filter(i => {
      if (i.read === false) {
        count++
      } return count
   })
   if (count === 1) {
      plural = false
   }

   return (
      <div className="row toolbar">
         <div className="col-md-12">
            <p className="pull-right">
            <span className="badge badge">{count}</span>
            {`unread message${plural ? 's' : ''}`}
            </p>
            <a class= "check" onClick = {props.hideMessage} className="btn btn-danger">
            <i className= {`fa ${props.composeMessage ? 'fa-plus' : 'fa-minus'}`}></i> 
            </a>

    <button onClick= {props.selectAll} className="btn btn-default">
      <i className="fa fa-minus-square-o"></i>
    </button>

    <button onClick = {props.markRead} className="btn btn-default">Mark As Read</button>

    <button onClick = {props.markUnRead} className="btn btn-default">Mark As Unread</button>

    <select onChange = {(event) => {props.addLabel(event); event.target.selectedIndex=0}} className="form-control label-select">
      <option selected disabled>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select onChange = {(event) => {props.removeLabel(event); event.target.selectedIndex=0}}  className="form-control label-select">
      <option selected disabled>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button onClick = {props.deleteMessage} className="btn btn-default">
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>
   )
}

export default Toolbar;
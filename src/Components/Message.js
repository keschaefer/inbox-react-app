import React from 'react';

const Message = (props) => {
   return ( 
        <div>
            <form className={`form-horizontal well ${props.composeMessage ? 'hidden' : ''}`}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input onChange = {props.saveSubject} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label  className="col-sm-2 control-label">Body</label>
                        <div className="col-sm-8">
                            <textarea onChange = {props.saveBody} name="body" id="body" className="form-control"></textarea>
                        </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input onClick = {props.addMessage} type="submit" value="Send" className="btn btn-primary"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Message;
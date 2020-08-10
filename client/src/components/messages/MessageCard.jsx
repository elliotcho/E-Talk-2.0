import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    constructor(){
        super();

        this.state = {
            memberNames: 'Loading...'
        }
    }

    async componentDidMount(){
        const {uid, chatId} = this.props;

        //get member names
        const config = {headers: {'content-type': 'application/json'}};
        const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
        const memberNames = response.data.memberNames;
   
        this.setState({memberNames});
    }

    render(){
        const {memberNames} = this.state;

        const {timeOfLastMessage} = this.props;

        return(
            <div className ={`msg-card card flex-row flex-wrap`}>         
                    <div className ='card-header border-0'>
                        <img src={loading} alt='profile-pic'/>
                    </div>
                      
                   <div className ='card-block'>
                        <h3>{memberNames}</h3>
                        
                        <p>
                            {/*this.state.read?
                                this.formatContent():
                               <strong className ='text-dark'>{this.formatContent()}</strong>*/
                            }
                        </p>
                        
                        <p className='text-muted'>{moment(timeOfLastMessage).calendar()}</p>
                   </div>
            </div>
        )
    }
}

export default withRouter(MessageCard);
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    render(){
        return(
            <div className ={`msg-card card flex-row flex-wrap`}>         
                    <div className ='card-header border-0'>
                        <img src={loading} alt='profile-pic'/>
                    </div>
                      
                   <div className ='card-block'>
                        <h3>{/*this.state.memberNames*/}</h3>
                        
                        <p>
                            {/*this.state.read?
                                this.formatContent():
                               <strong className ='text-dark'>{this.formatContent()}</strong>*/
                            }
                        </p>
                        
                        <p className='text-muted'>{/*date*/}</p>
                   </div>
            </div>
        )
    }
}

export default withRouter(MessageCard);
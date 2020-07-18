import React, {Component} from 'react';

class PostSettings extends Component{
    constructor(){
        super();

        this.state = {
            clicked: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const {clicked} = this.state;

        this.setState({
            clicked: !clicked
        });
    }

    render(){
        const {clicked} = this.state;

        const ellipsisStyle = (clicked)? {visibility: 'hidden'} :  {visibility: 'visible'};

        return(
            <div>
                <div className = 'post-settings' onClick = {this.handleClick}>
                    <i className ='fa fa-ellipsis-h' style = {ellipsisStyle}/>
                </div>
            </div>
        )
    }
}

export default PostSettings;
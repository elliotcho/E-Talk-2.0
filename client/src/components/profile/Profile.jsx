import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Profile extends Component{
    render(){
        if(!this.props.uid){
            return <Redirect to='/'/>
        }

        return(
            <div>
                HELLO
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(Profile);
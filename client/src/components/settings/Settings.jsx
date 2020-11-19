import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ChangeNameForm from './ChangeNameForm';
import { withAlert } from 'react-alert';
import './Settings.css';
import ChangePasswordForm from './ChangePasswordForm';

class Settings extends Component{
    render(){
        const { uid, alert } = this.props;

        if(!uid){
            return <Redirect to = '/'/>
        }

        return(
            <div className='settings'>
                <ChangeNameForm uid={uid} alert={alert}/>
                <ChangePasswordForm uid={uid} alert={alert}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({uid: state.auth.uid});

export default connect(mapStateToProps)(withAlert()(Settings));
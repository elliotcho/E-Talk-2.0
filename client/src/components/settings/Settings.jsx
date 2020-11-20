import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from '../../store/actions/profileActions';
import ChangeNameForm from './ChangeNameForm';
import ChangePasswordForm from './ChangePasswordForm';
import { io } from '../../App';
import { withAlert } from 'react-alert';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Settings.css';

function Settings({uid, alert}){
    if(!uid){
        return <Redirect to = '/'/>
    }

    const deleteAccount = () => {
        const confirmDelete = async () => {
            await deleteUser(uid);

            io.emit('LOGOUT', {uid});
            window.localStorage.clear();
            window.location.href='/';
        }

        confirmAlert({
            title: 'E-Talk',
            message: 'Are you sure you want to delete your account',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => {return;}}
            ]
        });
    }

    return(
        <div className='settings'>
            <div>
                <i className='fas fa-cog mr-3'/>

                <span>
                    Settings
                </span>
            </div>

            <div className='row'>
                <div className='col-12 col-sm-6'>
                    <ChangeNameForm uid={uid} alert={alert}/>
                </div>

                <div className='col-12 col-sm-6'>
                    <ChangePasswordForm uid={uid} alert={alert}/>
                </div>
            </div>

            <div className='del-container'>
                <h3 className='text-center mb-3'>
                    Delete Account
                </h3>

                <button className='btn btn-danger' onClick={deleteAccount}>
                    Delete Account
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({uid: state.auth.uid});

export default connect(mapStateToProps)(withAlert()(Settings));
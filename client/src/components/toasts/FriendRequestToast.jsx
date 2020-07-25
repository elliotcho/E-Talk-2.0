import React from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import './Toasts.css';

function FriendRequestToast(props){
    const {msg, firstName, lastName} = props.data;

    const toNetwork = () =>{
        toast.dismiss();
        props.history.push('/mynetwork');
    }

    return(
        <div onClick = {toNetwork} className ='fr-toast'>
            <strong>{firstName} {lastName}</strong>
            <span> {msg}</span>
        </div>
    )
}

export default withRouter(FriendRequestToast);
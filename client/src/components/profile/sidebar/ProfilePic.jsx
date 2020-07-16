import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeProfilePic} from '../../../store/actions/profileActions';
import loading from '../../../images/loading.jpg';

class ProfilePic extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null, 
            canChange: false,
            labelStyle: {visibility: 'hidden'}
        }

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const {profileId, uid} = this.props;

        fetch(`http://localhost:5000/users/profilepic/${profileId}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({
                canChange: profileId === uid,
                imgURL: URL.createObjectURL(file)
            });
        });
    }

    handleMouseOver(){
       this.setState({labelStyle: {visibility: 'visible'}});
    }

    handleMouseLeave(){
        this.setState({labelStyle: {visibility: 'hidden'}});
    }

    handleChange(e){
        this.props.changeProfilePic(this.props.uid, e.target.files[0]);
    }

    render(){
        const {imgURL, canChange, labelStyle} = this.state;

        return(
            <section className='profile-pic' onMouseOver = {this.handleMouseOver} onMouseLeave = {this.handleMouseLeave}>

                <img src ={imgURL? imgURL: loading} alt='profile pic'/>

                <label style = {canChange? labelStyle: {display: 'none'}} htmlFor = 'uploadPic'>
                    <div className ='text-center update-pic-txt'>
                        Update
                    </div>
                </label>

                <input type ='file' 
                       id ='uploadPic' 
                       accept = 'jpg jpeg png'
                       onChange = {this.handleChange}
                />
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        changeProfilePic: (uid, profilePic) => {dispatch(changeProfilePic(uid, profilePic));}
    }
}

export default connect(null, mapDispatchToProps)(ProfilePic);
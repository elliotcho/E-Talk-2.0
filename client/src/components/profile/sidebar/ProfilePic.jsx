import React, {Component} from 'react';
import {getProfilePic, changeProfilePic} from '../../../store/actions/profileActions';
import loading from '../../../images/loading.jpg';

class ProfilePic extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null, 
            labelStyle: {visibility: 'hidden'},
            canChange: false
        }

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        const {profileId, uid} = this.props;

        const imgURL = await getProfilePic(profileId);
        const canChange = uid === profileId;

        this.setState({imgURL, canChange});
    }

    handleMouseOver(){
       this.setState({
           labelStyle: {visibility: 'visible'}
        });
    }

    handleMouseLeave(){
        this.setState({
            labelStyle: {visibility: 'hidden'}
        });
    }

    handleChange(e){
        changeProfilePic(this.props.uid, e.target.files[0]);
    }

    render(){
        const {imgURL, canChange, labelStyle} = this.state;

        return(
            <section className='profile-pic' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                <img src ={imgURL? imgURL: loading} alt='profile pic'/>

                <label style = {canChange? labelStyle: {display: 'none'}} htmlFor = 'uploadPic'>
                    <div className ='text-center update-pic-txt'>
                        Update
                    </div>
                </label>

                <input 
                       type ='file' 
                       id ='uploadPic' 
                       accept = 'jpg jpeg png'
                       onChange = {this.handleChange}
                />
            </section>
        )
    }
}

export default ProfilePic;
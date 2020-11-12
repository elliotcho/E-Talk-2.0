import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as profileActions from '../../../store/actions/profileActions';

class ProfileSkills extends Component{
    constructor(){
        super();

        this.state = { 
            skills: [], 
            newSkill: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
    }

    async componentDidMount(){
        const {uid} = this.props;

        const skills = await profileActions.getUserSkills(uid);

        this.setState({skills});
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        const {skills, newSkill} = this.state;
        const {uid} = this.props;

        if(newSkill.trim().length === 0){
            return;
        }

        await profileActions.addSkill(uid, newSkill);
        skills.push(newSkill);
        
        this.setState({
            skills, 
            newSkill: ''
        });
    }

    async deleteSkill(idx){
        const {skills} = this.state;
        const {uid} = this.props;

        await profileActions.deleteSkill(uid, idx);
        skills[idx] = '';

        this.setState({skills});
    }

    render(){
        const {skills, newSkill} = this.state;

        return(
            <div className='skills-container'>
                <div className='text-center mt-5'>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type='text'
                            id = 'newSkill'
                            value = {newSkill}
                            onChange = {this.handleChange}
                            required
                        />
                    </form>
                </div>

                {skills.length > 0?
                    skills.map((name, i) => 
                        <div key={i} className='skill' style={name? {}: {display: 'none'}}>                   
                            <span>
                                {name}
                            </span>

                            <i 
                                className='ml-2 fa fa-times' 
                                onClick={() => this.deleteSkill(i)}
                            />
                        </div>
                    ) : 
                    (<h1>
                        User has not updated their skills
                    </h1>)
                }              
            </div>
        )
    }
}

const mapStateToProps = (state) => ({uid: state.auth.uid});

export default connect(mapStateToProps)(ProfileSkills);
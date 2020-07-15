import React, {Component} from 'react';

class ProfileMenu extends Component{
    render(){
        return(
            <div className ='profile-menu'>
                <ul className ='nav'>
                    <li className ='active'>
                        <a href='/'>Posts</a>
                    </li>

                    <li>
                        <a href='/'>Bio</a>
                    </li>

                    <li>
                        <a href='/'>Projects</a>
                    </li>

                    <li>
                        <a href='/'>Skills</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ProfileMenu;
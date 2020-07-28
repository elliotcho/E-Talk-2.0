import React, {Component} from 'react';
import loading from '../../../../images/loading.jpg';

class UserComment extends Component{
    render(){
        return(
            <div className ='user-comment'>
                <div className ='row'>
                    <div className ='col-2'>
                        <img src = {loading} alt ='profile pic'/>
                    </div>

                    <div className ='col-7 mt-1'>
                        <h5 className ='text-primary'>Blyke Doe</h5>
                        <p className ='text-muted'>Yesterday at 12:33PM</p>
                    </div>

                    <div className='col-3 text-right'>
                        <i className ='fa fa-ellipsis-h'/>
                    </div>

                    <div className ='user-content'>
                        This is a comment blahjdad;skfja;dfkja;f
                        ad;fkja;dkjfa;kjf
                        ad;fkja;dfkjaf;kaj
                        ;akdfj;akfja;
                    </div>
                </div>
            </div>
        )
    }
}

export default UserComment;
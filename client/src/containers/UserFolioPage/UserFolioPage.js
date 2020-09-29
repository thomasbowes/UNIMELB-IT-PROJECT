import React, {Component} from 'react';
import FilesUpload from '../../components/FilesUpload/FilesUpload';
import eggImage from '../../assets/ProfileImages/egg.jpg'
import './UserFolioPage.css'

class UserFolioPage extends Component {
    render(){
        return(
            <div className="UserFolioPage">
                <div className="User">
                    <div className="UserPictureHolder">
                        <img className="UserPicture"src={eggImage} alt='egg' />
                    </div>

                    <div className="UserInfoHolder">
                        <div className="UserInfo">
                            <p><b>Name: </b> Mr. Eggy</p>
                        </div>
                        <div className="UserInfo">
                            <p><b>Birthday: </b> 2023.9.30</p>
                        </div>
                        <div className="UserInfo">
                            <p><b>Education: </b> Eggy Institute of Technology</p>
                        </div>
                        <div className="UserInfo">
                            <p><b>Past experience: </b> Boiled.</p>
                        </div>
                    </div>
                </div>
                <FilesUpload />
            </div>
        );
    }
}

export default UserFolioPage;
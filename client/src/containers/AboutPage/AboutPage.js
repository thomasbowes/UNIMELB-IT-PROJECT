import React, {Component} from 'react';
import MemberCard from '../../components/AboutPageElement/MemberCard/MemberCard'
import './AboutPage.css'

class AboutPage extends Component{
    render () {
        return (
            <div className='AboutPage'>
                <MemberCard name="Thomas"/>
                <MemberCard name="Song"/>
                <MemberCard name="Ray"/>
                <MemberCard name="Lily"/>
                <MemberCard name="Keizo"/>
            </div>
        );
    };
}

export default AboutPage;
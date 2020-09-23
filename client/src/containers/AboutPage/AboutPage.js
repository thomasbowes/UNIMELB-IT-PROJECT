import React, {Component} from 'react';
import MemberCard from '../../components/AboutPageElement/MemberCard/MemberCard'
import './AboutPage.css'

class AboutPage extends Component{
    render () {
        return (
            <div className='AboutPage'>
                <h1>About Us</h1>
                <p className='text'>The folio-exchange website is created and maintained by O(n!), which is a group of five members. Our purpose is to create an 
                    app for guaduates to upload/show their works, and for employers to search for the portfolio of potential employees.
                </p>

                <ul></ul>

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
import React, {Component} from 'react';
import './MemberCard.css';
import Keizo from '../../../../src/assets/TeamMembers/Keizo.jpg';
import Song from '../../../../src/assets/TeamMembers/Song.jpg';
import Lily from '../../../../src/assets/TeamMembers/Lily.jpg';
import Thomas from '../../../../src/assets/TeamMembers/Thomas.jpg';
import Ray from '../../../../src/assets/TeamMembers/Ray.jpg';
//import Aux from '../../../hoc/Auxiliary/Auxiliary'

class MemberCard extends Component{

    state = {
        image: null,
        work: null,
        email: null,
        name: null
    }

    stateSetter = (name) => {
        const frontEndWork = "Front-End Engineer";
        const backEndWork = "Back-End Engineer";
        switch (name){
            case "Keizo":
                this.setState({image: Keizo, work: backEndWork, email: "k.hamaguchi", name: "Keizo Hamaguchi"});
                break;
            case "Song":
                this.setState({image: Song, work: frontEndWork, email: "yige.song", name: "Yige Song"});
                break;
            case "Lily":
                this.setState({image: Lily, work: backEndWork, email: "h.li95", name: "Haoxin (Lily) Li"});
                break;
            case "Thomas":
                this.setState({image: Thomas, work: frontEndWork, email: "thomas.bowes", name: "Thomas Bowes"});
                break;
            case "Ray":
                this.setState({image: Ray, work: backEndWork, email: "juiteng.chen", name: "Juiteng (Ray) Chen"});
                break;
            default:
                return null;
        }

    }

    componentWillMount () {
        this.stateSetter(this.props.name);
    }


    render() {
        const unimelb = "@student.unimelb.edu.au"

        return (
            <div className="Card">
                <img src={this.state.image} alt="Keizo" width="100%"></img>
                <p className="title">{this.state.name}</p>
                <p>{this.state.work}</p>
                <p>{this.state.email}</p>
                <p>{unimelb}</p>
            </div>
        );
    }
}

export default MemberCard;
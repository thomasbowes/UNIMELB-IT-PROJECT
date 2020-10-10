import React, {Component} from 'react';
import FilesUpload from '../../components/FilesUpload/FilesUpload';
import ImgUpload from '../../components/FilesUpload/ImgUpload';
import eggImage from '../../assets/ProfilePageDocuments/egg.jpg'
import './UserFolioPage.css'
import eggPdf from '../../assets/ProfilePageDocuments/eggPdf.pdf';
import PdfViewer from '../../components/Viewer/PdfViewer/PdfViewer';
import PdfPreview from '../../components/Viewer/PdfPreview/PdfPreview';
import BackDrop from '../../components/UI/BackDrop/BackDrop'

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import ProfileBlockWithImage from '../../components/ProfilePageFileTemplate/ProjectBlockWithImage/ProfileBlockWithImage';
import ProfileBlockNoImage from '../../components/ProfilePageFileTemplate/ProfileBlockNoImage/ProfileBlockNoImage';
import ProfileBlockTwoProject from '../../components/ProfilePageFileTemplate/ProfileBlockTwoProject/ProfileBlockTwoProject';
import EducationHistory from '../../components/ProfilePageFileTemplate/EducationHistory/EducationHistory';

import eggImg1 from '../../assets/ProfilePageDocuments/egg1.jpg'
import eggImg2 from '../../assets/ProfilePageDocuments/egg2.jpg'
import eggImg3 from '../../assets/ProfilePageDocuments/egg3.jpg'
import eggImg4 from '../../assets/ProfilePageDocuments/egg4.jpg'
import eggImg5 from '../../assets/ProfilePageDocuments/egg5.jpg'

import google1 from '../../assets/ProfilePageDocuments/google.png';
import google2 from '../../assets/ProfilePageDocuments/google2.jpg';


class UserFolioPage extends Component {
    state = {showPdf: false}

    showPdfToggle = () => {
        const newShowPdf = !this.state.showPdf;
        this.setState({showPdf: newShowPdf})
    }

    render() {
        const images = [
            {
                original: eggImg1,
                thumbnail: eggImg1,
            },
            {
                original: eggImg2,
                thumbnail: eggImg2,
            },
            {
                original: eggImg3,
                thumbnail: eggImg3,
            },
            {
                original: eggImg4,
                thumbnail: eggImg4,
            },
            {
                original: eggImg5,
                thumbnail: eggImg5,
            }
          ];

          const text = "The egg is the organic vessel containing the zygote in which an embryo develops until it can survive on its own, at which point the animal hatches. An egg results from fertilization of an egg cell. Most arthropods, vertebrates (excluding live-bearing mammals), and mollusks lay eggs, although some, such as scorpions, do not. Reptile eggs, bird eggs, and monotreme eggs are laid out of water and are surrounded by a protective shell, either flexible or inflexible. Eggs laid on land or in nests are usually kept within a warm and favorable temperature range while the embryo grows. When the embryo is adequately developed it hatches, i.e., breaks out of the egg's shell. Some embryos have a temporary egg tooth they use to crack, pip, or break the eggshell or covering."
          return (
            <div className="UserFolioPage">
                <div className="User-info">
                    <div className="UserPictureHolder">
                        <img className="UserPicture"src={eggImage} alt='egg' />
                    </div>
    
                    <div className="UserInfoHolder">
                        <div className="UserInfo">
                            <h1>Mr. Eggy Egglington</h1>
                        </div>
                        <div className="UserInfo">
                            <h2>An eggcellent student at Eggy Institute of Technology</h2> 
                        </div>
                        <div className="Objective">
                            <p>A dedicated expert in the field of eggnomics, pushing egg-legislation to be beneficial for your average egg. With my extensive egg-u-cation i bring a dynamic off eggspertise to wherever i work. {text}</p> 
                        </div>
                    </div>
                </div>
                <ProfileBlockWithImage image={google2} text={text} title="Founded Eooggle" />
                <ProfileBlockNoImage text={text} title="Founded Eooggle" />
                <ProfileBlockTwoProject texts={[text, text]} titles={["Founded Eooggle", "Founded Eggipedia"]} />
                <div className="ImageGallery">   
                    <ImageGallery items={images} 
                        showThumbnails={false}
                        autoPlay={true}
                    />
                </div> 
                <EducationHistory
                        schools={["Eggy Junior High", "University of Eggplication", "Institute of Making Benedict Egg"]} 
                        descriptions={[text, text, text]} 
                        images={[google1, google1, google2]}
                        durations={["2022-2024", "2024-2027", "2027-2???"]} />
                
                <h1>Everything below this is for testing purposes. this is first draft of the profile</h1>
                <div className="test">
                    <PdfPreview file={eggPdf} clicked={this.showPdfToggle}/>
                </div>
    
                {this.state.showPdf? <BackDrop clicked={this.showPdfToggle} show={this.state.showPdf}/>:null}
                {this.state.showPdf? <PdfViewer file={eggPdf} />:null}
                
                
                
                <FilesUpload />
                <p> img upload</p>
                <ImgUpload />
            </div>
    
        );
    }
}


export default UserFolioPage;
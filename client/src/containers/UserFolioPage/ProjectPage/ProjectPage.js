import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import './ProjectPage.css'

import eggPdf from '../../../assets/ProfilePageDocuments/eggPdf.pdf';
import PdfViewer from '../../../components/Viewer/PdfViewer/PdfViewer';
import PdfPreview from '../../../components/Viewer/PdfPreview/PdfPreview';
import BackDrop from '../../../components/UI/BackDrop/BackDrop'
import FilesUpload from '../../../components/FilesUpload/FilesUpload';
import ImgUpload from '../../../components/FilesUpload/ImgUpload';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

import eggImg1 from '../../../assets/ProfilePageDocuments/egg1.jpg'
import eggImg2 from '../../../assets/ProfilePageDocuments/egg2.jpg'
import eggImg3 from '../../../assets/ProfilePageDocuments/egg3.jpg'
import eggImg4 from '../../../assets/ProfilePageDocuments/egg4.jpg'
import eggImg5 from '../../../assets/ProfilePageDocuments/egg5.jpg'
import EditForm from '../../../components/ProfilePageFileTemplate/EditForm/EditForm';

const defaultTitle = "Default Title"
const defaultDes = "Default Description: The egg is the organic vessel containing the zygote in which an embryo develops until it can survive on its own, at which point the animal hatches. An egg results from fertilization of an egg cell. Most arthropods, vertebrates (excluding live-bearing mammals), and mollusks lay eggs, although some, such as scorpions, do not. Reptile eggs, bird eggs, and monotreme eggs are laid out of water and are surrounded by a protective shell, either flexible or inflexible. Eggs laid on land or in nests are usually kept within a warm and favorable temperature range while the embryo grows. When the embryo is adequately developed it hatches, i.e., breaks out of the egg's shell. Some embryos have a temporary egg tooth they use to crack, pip, or break the eggshell or covering.The egg is the organic vessel containing the zygote in which an embryo develops until it can survive on its own, at which point the animal hatches. An egg results from fertilization of an egg cell. Most arthropods, vertebrates (excluding live-bearing mammals), and mollusks lay eggs, although some, such as scorpions, do not. Reptile eggs, bird eggs, and monotreme eggs are laid out of water and are surrounded by a protective shell, either flexible or inflexible. Eggs laid on land or in nests are usually kept within a warm and favorable temperature range while the embryo grows. When the embryo is adequately developed it hatches, i.e., breaks out of the egg's shell. Some embryos have a temporary egg tooth they use to crack, pip, or break the eggshell or covering."


class ProjectPage extends Component {
    state = {
        showPdf: false,

        titleDesEditable: false,
        filesEditable: false,

        title: defaultTitle,
        description: defaultDes}

    showPdfToggle = () => {
        const newShowPdf = !this.state.showPdf;
        this.setState({showPdf: newShowPdf})
    }

    changeTitleDes = (inputs) => {
        this.setState({title: inputs[0], description: inputs[1]})
    }

    changeTitleDesEditable = () => {
        this.setState({titleDesEditable: !this.state.titleDesEditable})
    }

    render(){
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
        return (
            <div className="ProjectPage">

                {this.state.titleDesEditable? 
                    <EditForm values={[this.state.title, this.state.description]} 
                        changeEditable = {this.changeTitleDesEditable} 
                        changeValues={this.changeTitleDes}
                        fields={["Project Title", "Project Description"]}/>
                :   <Aux>
                        <h1>{this.state.title}</h1>
                        <p>{this.state.description}</p>
                        <button onClick={this.changeTitleDesEditable}>Change project title/description</button>
                    </Aux>
                    }

                <div className="ImageGallery">   
                    <ImageGallery items={images} 
                        showThumbnails={false}
                        autoPlay={true}
                    />
                </div> 
            
                <div className="test">
                    <PdfPreview file={eggPdf} clicked={this.showPdfToggle}/>
                </div>
    
                {this.state.showPdf? <BackDrop clicked={this.showPdfToggle} show={this.state.showPdf}/>:null}
                {this.state.showPdf? <PdfViewer file={eggPdf} />:null}

                <FilesUpload
                    itemBlock_id='5f81bdf6db99e33e48002c54'
                    type='File'
                    maxFiles = {10}
                    accept = ''
                    disabled={false}
                />
                    <p> img upload</p>
                <ImgUpload />
            </div>
        )
    }
}

export default ProjectPage;
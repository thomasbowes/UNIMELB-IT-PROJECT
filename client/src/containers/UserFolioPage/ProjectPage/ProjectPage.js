import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import './ProjectPage.css'

import eggPdf1 from '../../../assets/ProfilePageDocuments/eggPdf1.pdf';
import eggPdf2 from '../../../assets/ProfilePageDocuments/eggPdf2.pdf';
import PdfViewer from '../../../components/Viewer/PdfViewer/PdfViewer';
import PdfPreview from '../../../components/Viewer/PdfPreview/PdfPreview';
import BackDrop from '../../../components/UI/BackDrop/BackDrop'
import FilesUpload from '../../../components/FilesUpload/FilesUpload';
import ImgUpload from '../../../components/FilesUpload/ImgUpload';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

//redux
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import axios from "axios";

import crossIcon from '../../../assets/LoginPage-icons/cross.svg';

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
      
        files: [],
      
        titleDesEditable: false,
        filesEditable: false,
      
        title: defaultTitle,
        description: defaultDes,
      
        images : [
            {
                original: eggImg1,
                thumbnail: eggImg1,
                id: "a"
            },
            {
                original: eggImg2,
                thumbnail: eggImg2,
                id: "b"
            },
            {
                original: eggImg3,
                thumbnail: eggImg3,
                id: "c"
            },
            {
                original: eggImg4,
                thumbnail: eggImg4,
                id: "d"
            },
            {
                original: eggImg5,
                thumbnail: eggImg5,
                id: "f"
            }
        ],

        pdfs : [
            {file: eggPdf1, show: false, id:"1"},
            {file: eggPdf2, show: false, id:"2"}
        ]
    }


    componentDidMount() {
        //const item_id = this.props.itemBlock_id;5f81bdf6db99e33e48002c54

        const item_id = "5f81bdf6db99e33e48002c54";

        if(!item_id) return;

        //set item id for query data
        const data = {
            item_id: item_id
        }

        //get all files by given item_id
        axios.post('/api/files/seeAll', data)
            .then(response => {
                //console.log(response.data.files);
                this.setState({files: response.data.files});
                console.log(this.state.files);
            })
            .catch(error => {
                this.setState({files: []});
                console.log(error);
            });
    }

       

    changeTitleDes = (inputs) => {
        this.setState({title: inputs[0], description: inputs[1]})
    }

    changeTitleDesEditable = () => {
        this.setState({titleDesEditable: !this.state.titleDesEditable})
    }

    changeFileEditable = () => {
        this.setState({filesEditable: !this.state.filesEditable})
    }

    deleteImageByIndex = (index) => {
        const newImages = [...this.state.images];
        newImages.splice(index, 1);
        this.setState({images: newImages});
    }

    deletePdfByIndex = (index) => {
        const newPdfs = [...this.state.pdfs];
        newPdfs.splice(index, 1);
        this.setState({pdfs: newPdfs});
    }

    editingImages = () => {
        return this.state.images.map((image, index) => {
            return <Aux>
                        <img src={crossIcon} alt="delete" onClick={() => this.deleteImageByIndex(index)}/>
                        <img src={image.original} alt={"image:"+image.id} />
                    </Aux>
        })
    }

    getPdfIndexById = (id) => {
        let i = 0
        for (i = 0 ; i < this.state.pdfs.length ; i++){
            if (this.state.pdfs[i].id === id){
                return i;
            }
        }
        return null;
    }

    getPdfIndexByActive = () => {
        let i = 0
        for (i = 0 ; i < this.state.pdfs.length ; i++){
            if (this.state.pdfs[i].show === true){
                return i;
            }
        }
        return null;
    }


    // change the show pdf value, given the id of the pdf
    showPdfToggle = (index) => {
        const newPdfs = [...this.state.pdfs]

        const newPdfItem = this.state.pdfs[index]
        const oldShowPdf = newPdfItem.show;
        newPdfItem.show = ! oldShowPdf;
        newPdfs[index] = newPdfItem;

        this.setState({pdfs: newPdfs})
    }

    showPdfs = () => {
        return this.state.pdfs.map((pdf, index)=>{
            return <Aux>
                        <PdfPreview file={pdf.file} clicked={()=>this.showPdfToggle(index)} />
                        {pdf.show? 
                            <Aux>
                                <BackDrop clicked={()=>this.showPdfToggle(index)} show={pdf.show}/>
                                <PdfViewer file={pdf.file} />
                            </Aux>
                        :   null
                        }
                    </Aux>
        })
    }

    doNothing = () => {

    }

    showPdfEditing = () => {
        return this.state.pdfs.map((pdf,index) => {
            return <Aux>
                        <img src={crossIcon} alt="delete" onClick={() => this.deletePdfByIndex(index)}/>
                        <PdfPreview file={pdf.file}  clicked={this.doNothing} />
                    </Aux>
        })
    }

    // return true if the visitor has the right to edit this userFolioPage
    checkHasRightToEdit = () => {
        const folioOwnerId = this.props.match.params.userId;
        const visitorToken = this.props.userAuthToken;
        // return true, if the visitor is the folioPage owner, or the visitor is an admin staff
        if (visitorToken !== null && folioOwnerId !== null && (folioOwnerId===visitorToken._id || this.props.userAuthToken.isAdmin)){
            return true;
        }
        return false;
        // otherwise return false
    }

    // return the edit buttons, based on whether the file and profile is editable
    editButtons = () => {
        if (this.state.titleDesEditable){
            return <button onClick={this.changeFileEditable}>{this.state.filesEditable? "Save" : "Edit Files"}</button>
        }
        return <Aux>
                    <button onClick={this.changeTitleDesEditable}>Change project title/description</button>
                    <button onClick={this.changeFileEditable}>{this.state.filesEditable? "Save" : "Edit Files"}</button>
                </Aux>
    }

    



    render(){
        return (
            <div className="ProjectPage">
          
                {this.state.titleDesEditable && this.checkHasRightToEdit()? 
                    <EditForm values={[this.state.title, this.state.description]} 
                        changeEditable = {this.changeTitleDesEditable} 
                        changeValues={this.changeTitleDes}
                        fields={["Project Title", "Project Description"]}
                        inputTypes={["input", "large input"]}/>
                :   <Aux>
                        <h1>{this.state.title}</h1>
                        <p>{this.state.description}</p>
                    </Aux>
                }

                {this.checkHasRightToEdit()?
                    this.editButtons()
                :   null
                }


                {this.state.filesEditable? 
                    <Aux>
                        {this.editingImages()}
                        {this.showPdfEditing()}
                        <FilesUpload
                            itemBlock_id='5f81bdf6db99e33e48002c54'
                            type='File'
                            maxFiles = {10}
                            //accept="image/*,audio/*,video/*"
                            accept = 'image/*,audio/*,video/*'
                            //disabled={false}
                            fileRejectMessage = 'Image, audio and video files only'
                        />
                        <p> img upload</p>
                        <ImgUpload />
                    </Aux>
                :   <Aux>
                        <div className="ImageGallery">   
                            {this.state.images.length > 0? 
                                <ImageGallery items={this.state.images} 
                                    showThumbnails={false}
                                    autoPlay={true}/>
                            :   null}
                        </div> 
                        {this.showPdfs()}
                    </Aux>
                }
            </div>
        )
    }
}

//bring in redux state
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        LoginMessage: state.auth.message,
        userAuthToken: state.auth.userAuthToken
    };
};


//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch( actionCreators.auth(email, password)),
        onLogout: () => dispatch(actionCreators.authLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
import '../styles/NewProject.css'

import Topbar from "../component/Topbar";
import InputDropDown from '../component/sign/InputDropDown';
import { ReactComponent as CheckIcon } from '../icons/check.svg'
import { ReactComponent as UploadIcon } from '../icons/upload_file.svg'
import {ReactComponent as HorizontalLineIcon} from '../icons/horizontal_line.svg'
import LongButton from '../component/sign/LongButton';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProgressCircle(props) {
    // state : done, undone, now
    const classes = "progress-circle " + props.state

    return (
        <div className='progress-circle-wrapper'>
            <div className={classes} >
                {props.state == "done" && <CheckIcon width={"36px"} height={"36px"} />}
            </div>
            {props.text}
        </div>
    )
}

function ProgressIndicator(props) { 

    if (props.test) {
        return (
            <div className="progress-tab">
                <ProgressCircle state="now" text="게임 프로젝트 설정" />
                <div className="progress-line line-dotted" />
                <ProgressCircle state="undone"  text="게임 업로드"/>
            </div>
        )
    } else if (props.gameUpload) { 
        return (
            <div className="progress-tab" >
                <ProgressCircle state="done" text="게임 프로젝트 설정"/>
                <div className="progress-line" />
                <ProgressCircle state="now" text="게임 업로드"/>
            </div>
        )

    }
    return null;
}

function Editor() {
    const [description, setDescription] = useState('');

    console.log(description)
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, false] }],   
                [{ size: ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote'],
                ['link', 'image'],
                [{ 'align': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
          ],
        },
      };


    return(
    <div className='game-description-editor'>
        <ReactQuill id="description"
                modules={modules}
                style={{
                    width: '880px', height: "100%"}}
                theme='snow' value={description} onChange={setDescription}
            />
    </div>)
  
}

function UploadGame() {
    const navigation = useNavigate();
    
    // 업로드 버튼 누를시
    const [isUploadDone, setIsUploadDone] = useState(false);
    // 게임 프로젝트 생성 버튼 누를 시 
    const handleNewProjectButton = () => {
        console.log("게임 프로젝트 생성 완료");
        navigation('/')
    }


    return (
        <>
            <header>
            <Topbar/>   
            </header>
            <div className="mainContainer">
                <div className="new-project-tab">
                    <h1>새 게임 프로젝트 생성</h1>
                    <ProgressIndicator gameUpload={true} />
                    <div className='game-upload-wrapper'>
                        게임 업로드 하기
                        <div className="game-upload-button" onClick={()=>{setIsUploadDone(!isUploadDone)}}>
                            <UploadIcon width={"100px"} />
                        </div>
                        {isUploadDone &&  <div style={{fontSize: '16px'}}>업로드 성공</div>}
                    </div>
                    <div className="next-button">
                        <LongButton value="게임 프로젝트 생성하기" width="300px" onClick={handleNewProjectButton} />
                    </div>
                </div>
            </div>
        </>
    )
}

function UploadTestInformation(props) {
    return (
        <>
            <header>
               <Topbar/>   
            </header>
            <div className="mainContainer">
                <div className="new-project-tab">
                    <h1>새 게임 프로젝트 생성</h1>
                    <ProgressIndicator test={true} />
                    <div className="new-project-input-wrapper">
                        <h2>게임 제목</h2>
                        <div className="thumbnail-and-test-wrapper">
                            <div>
                                섬네일 이미지 업로드
                                <div className="game-upload-thumbnail">
                                    <image />
                                </div>
                            </div>
                            <div className='test-input-wrapper'>
                                <div>
                                    테스터 인원<br/>
                                    <InputDropDown width="100%"/>
                                </div>
                                <div>
                                    테스터 모집 기간<br />
                                    <div className="tester-period">
                                        <input class="input-date" type='date' />
                                        <HorizontalLineIcon/>
                                        <input class="input-date" type='date' />
                                    </div>
                                </div>
                                <div>
                                    리뷰 마감 기한<br />
                                    <input class="input-date" type='date' />
                                </div>
                                <div>
                                    연령 제한<br />
                                    <InputDropDown width="100%"/>
                                </div>
                            </div>
                        </div>                        
                        <div className='editor-wrapper'>
                            게임 설명<br/>
                            <Editor/>
                            {/* <textarea className="game-description" name="description" id="description"></textarea> */}
                        </div>
                    </div>
                    <div className="next-button">
                        <LongButton value="다음 단계로 넘어가기" yellow={true} width="300px"
                            onClick={() => { props.onClickButton(2) }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

function NewProject() {
    const [whichPart, setWhichPart] = useState(1);

    return (
        <>
            {whichPart == 1 ? <UploadTestInformation onClickButton={setWhichPart} />: <UploadGame/>}
        </>
    )
}

export default NewProject;
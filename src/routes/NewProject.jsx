import '../styles/NewProject.css'

import InputDropDown from '../component/sign/InputDropDown';
import { ReactComponent as CheckIcon } from '../icons/check.svg'
import { ReactComponent as UploadIcon } from '../icons/upload_file.svg'
import {ReactComponent as HorizontalLineIcon} from '../icons/horizontal_line.svg'
import LongButton from '../component/sign/LongButton';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ages } from '../age';
import InputBox from '../component/sign/InputBox';
import { getExistingGames, makeNewTest } from '../api/Proto';
import { uploadGameFile, uploadGameThumbnail } from '../firebase/firebaseStorage';
import { useMutation } from '@tanstack/react-query';
import { getUserSession } from '../api/User';
import { set } from 'firebase/database';

const exceptThisSymbols = ["e", "E", "+", "-", "."];
const newProject = {
    gameName: '',
    round: '', 
    description: '',
    startDate: '',
    endDate: '',
    reviewDate: '',
    recruitTotal: 0,
    downloadLink: '',
    imgPath: '',
    status: null, 
}



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

function Editor({description, setDescription}) {

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

function UploadGame({gameId}) {
    const navigation = useNavigate();
    const [gameFile, setGameFile] = useState();
    const [isUploadDone, setIsUploadDone] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    console.log(newProject)

    const user = getUserSession(); 
    const { mutate: handleNewProjectButton } = useMutation({
        mutationFn: async () => {
            const imageUrl = await uploadGameThumbnail(newProject.imgPath, user.email, newProject['gameName']).then((url) => {
                return url 
            })

            await uploadGameFile(gameFile, user.email, newProject['gameName']).then((url) => {
                newProject['downloadLink'] = url;
            })

            const res = await makeNewTest(gameId, user.email, {
                round: newProject.round,
                gameName: newProject.gameName,
                description: newProject.description?? 'game description',
                startDate: newProject.startDate+"T00:00:00.000000",
                endDate: newProject.endDate+"T00:00:00.000000",
                reviewDate: newProject.reviewDate+"T00:00:00.000000",
                recruitedTotal: Number(newProject.recruitTotal),
                downloadLink: newProject.downloadLink?? "error no download link", 
                imgPath: imageUrl,
            })
            return res;
        },
        onSuccess: (res) => {
           
            console.log("게임 프로젝트 생성 완료");
            navigation(`/game/${res}`);
        },
        onError: (error) => {
            console.error("error", error);
        }
    })

    const handleUploadButton = (e) => { 
        e.preventDefault();

        const selectedFile = e.target.files; 
        if (selectedFile.length > 0) { 
            setGameFile(selectedFile[0]);
            setIsUploadDone(true);
            newProject['downloadLink'] = selectedFile[0].name;
        }
    }

    return (
        <>
            <div className="new-project-tab">
                <h1>새 게임 프로젝트 생성</h1>
                <ProgressIndicator gameUpload={true} />
                <div className='game-upload-wrapper'>
                    게임 업로드 하기
                    <label htmlFor='game-file-upload-input' className="game-upload-button" >
                        <UploadIcon width={"100px"} />
                    </label>
                    <div style={{fontSize: '16px'}}>{gameFile? gameFile.name : ''}</div>
                    <input type="file" id="game-file-upload-input" accept='.zip' onChange={handleUploadButton}/>
                </div>
                <div className="next-button">
                    <LongButton value="게임 프로젝트 생성하기" width="300px" onClick={handleNewProjectButton} />
                </div>
            </div>
        </>
    )
}

function UploadTestInformation(props) {
    const [selectedImage, setSelectedImage] = useState();
    const [gameName, setGameName] = useState(); 
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [reviewDate, setReviewDate] = useState();
    const [recruitTotal, setRecruitTotal] = useState();
    const [round, setRound] = useState();

    const handleSelectImage = (e) => {
        e.preventDefault();
        e.persist();
  
        // 이미지 선택 취소시 아무 변경 없음
      if (e.target.files.length > 0) { 
          const selectedImages = e.target.files;
  
          setSelectedImage(selectedImages[0]);
        }
    }
    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    }
    const handleEndDate = (e) => { 
        setEndDate(e.target.value);
    }
    const handleReviewDate = (e) => {  
        setReviewDate(e.target.value);
    }
    const handleRecruitTotal = (e) => {
        setRecruitTotal(e.target.value);
    }   


    const handleClickNextButton = () => {
        newProject['gameName'] = gameName;
        newProject['description']= description;
        newProject['startDate']= startDate;
        newProject['endDate'] = endDate;
        newProject['reviewDate'] = reviewDate;
        newProject['recruitTotal'] = recruitTotal;
        newProject['imgPath'] = selectedImage;
        newProject['round'] = round;
        
        props.onClickButton(2);
    }

    useEffect(() => {
        if (props.previousTest) {
            setGameName(props.previousTest.gameName);
            setDescription(props.previousTest.description);
            setRound(props.previousTest.round + 1)
        } else {
            setGameName(props.gameInfo.gameName);
            setRound(1);
        }
    }, [props.previousTest]);

    return (
        <>
            <div className="new-project-tab">
                <h1>새 게임 프로젝트 생성</h1>
                <ProgressIndicator test={true} />
                <div className="new-project-input-wrapper">
                    <h2>{gameName}</h2>
                    <div className="thumbnail-and-test-wrapper">
                        <div>
                            섬네일 이미지 업로드
                            <label for="game-thumbnail-input">
                                <div className="game-upload-thumbnail">
                                    {selectedImage ? <img
                                        className="game-upload-thumbnail"
                                        src={selectedImage ? URL.createObjectURL(selectedImage) : null}
                                        alt="thumbnail" />
                                    :"이미지를 업로드해주세요"}
                                    
                                </div>
                            </label>
                            <input
                                type="file"
                                id="game-thumbnail-input"
                                name="game-thumbnail"
                                accept=".png, .jpg"
                                onChange={handleSelectImage}
                            />
                        </div>
                        <div className='test-input-wrapper'>
                            <div>
                                테스터 인원<br/>
                                <InputBox width="100%" type="number" value={recruitTotal || ''} onChange={handleRecruitTotal} onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}/>
                            </div>
                            <div>
                                테스터 모집 기간<br />
                                <div className="tester-period">
                                    <input class="input-date" type='date' value={startDate || ''} onChange={handleStartDate} />
                                    <HorizontalLineIcon/>
                                    <input class="input-date" type='date' value={endDate || ''} onChange={handleEndDate} />
                                </div>
                            </div>
                            <div>
                                리뷰 마감 기한<br />
                                <input class="input-date" type='date' value={reviewDate} onChange={handleReviewDate} />
                            </div>
                            <div>
                                연령 제한<br />
                                <InputDropDown width="100%" optionList={ages} />
                            </div>
                        </div>
                    </div>                        
                    <div className='editor-wrapper'>
                        게임 설명<br/>
                        <Editor description={description} setDescription={setDescription} />
                    </div>
                </div>
                <div className="next-button">
                    <LongButton value="다음 단계로 넘어가기" yellow={true} width="300px"
                        onClick={() => {handleClickNextButton()}}
                    />
                </div>
            </div>
        </>
    )
}

function NewProject() {
    const [whichPart, setWhichPart] = useState(1);
    const [gameId, setGameId] = useState();
    const { state } = useLocation();

    const [previousTest, setPreviousTest] = useState(); 
    
    useEffect(() => {
        const fetchPreviousTest = async () => {
            try {
                const response = await getExistingGames(state.testId);
                setPreviousTest(response);
                setGameId(response.gameId);
            } catch (error) {
                setGameId(state.gameId)
                console.error('Error fetching previous test:', error);
            }
        };
        fetchPreviousTest();
    }, []);
  

    return (
        <>
            {whichPart == 1 ? <UploadTestInformation onClickButton={setWhichPart} gameInfo={state} previousTest={previousTest} /> : <UploadGame gameId={gameId} />}
        </>
    )
}

export default NewProject;
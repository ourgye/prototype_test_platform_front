import './ReviewUploadTab.css'
import {ReactComponent as CloseIcon} from '../../icons/close.svg'
import { useEffect, useState } from 'react'
import { getUserInfo } from '../../api/User';
import { useMutation } from '@tanstack/react-query';
import { postReview } from '../../api/Review';

function ReviewUploadTab({ gameName, userId, onClickClose, testId }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [review, setReview] = useState('');

    useEffect(() => {
        getUserInfo().then(async (res) => {
            const user = await res.json(); 
            setUser(user);
            setIsLoading(false);
        })
    }, [userId]);
    
    useEffect(() => {
        const scrollY = window.scrollY;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);
    
    const { mutate: handleClickPostReview } = useMutation({
        mutationFn: () => { return postReview(testId, user.email, review) },
        onSuccess: (res) => {
            console.log(res); 
            alert('리뷰가 성공적으로 등록되었습니다.'); 
            window.location.reload();
        },
        onError: (error) => {
            console.log(error);
            alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
        }
    })

    return (
        <div className="review-upload-tab">
            <div className="review-upload-tab-header">
                <div className="review-upload-close" onClick={onClickClose}>
                    <div className="close-icon">
                        <CloseIcon width={'24px'} height={'24px'}/>                   
                    </div>
                </div>
                <div className="review-upload-game-name">{gameName}</div>
                <div className="review-upload-user-info">
                    {isLoading && ''}
                    {!isLoading && user.name + ', ' + user.age + ', ' + user.gender}
                </div>
                {/* 아마도 라인?  */}
            </div>
            <div className="review-upload-tab-body">
                <textarea className='review-upload-textarea' placeholder='리뷰를 작성해주세요!' value={review} onChange={(e)=>setReview(e.target.value)}></textarea>
            </div>
            <div className="review-upload-buttons">
                <div className="review-upload-upload-button" onClick={handleClickPostReview}>
                    리뷰 게시하기
                </div>
                <div className="review-upload-summary-button">
                    다른 사용자들의 피드백 보기
                </div>
            </div>
        </div>
    )
}

export default ReviewUploadTab;
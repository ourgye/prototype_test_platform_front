import { Form } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../icons/profile_default.svg';

import './ProfileBox.css'
import { useState } from 'react';

// 사진 하나만 선택하도록
function ProfileBox() { 
    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedImageName, setSelectedImageName] = useState();

    const handleSelectImage = (e) => {
        e.preventDefault();
        e.persist();

        console.log(e.target.files)

        // 이미지 선택 취소시 아무 변경 없음
        if (e.target.files.length > 0) { 
            const selectedImage = e.target.files;
            const imageURL = URL.createObjectURL(selectedImage[0]);

            setSelectedImage(imageURL);
            setSelectedImageName(selectedImage[0].name);
        }
    }

    const profileSelectBtn = (
        <>
        <div className='profileSelectButton'>
            <label htmlFor="profileImageInput">프로필 이미지 선택</label>
        </div>
            <input
                type="file"
                id="profileImageInput"
                name="profileImage"
                accept=".png, .jpg"
                onChange={handleSelectImage}
            />
    </>
    )

    const profileImage = selectedImage[0] ? (
        <div className='profileImage'>
            <img src={selectedImage} alt={selectedImageName} id="profileImage" />
        </div>
    ) : (
        <div className='profileImage'>
            <ProfileIcon width='128px' height='128pxs\' className="profileIcon" />
        </div>
    );
    
    
    return (<Form className='profileImageBox'>
        {profileImage}
        {profileSelectBtn}
    </Form>);
    
}

export default ProfileBox;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyMemberInfo } from '/src/api/member.js';
import { updateMyProfile } from '/src/api/editProfile.js';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TokenAtom } from '/src/recoil/tokenAtom.js';
import { UserInfoAtom } from '/src/recoil/userInfoAtom.js';
import { useQuery } from '@tanstack/react-query';


const EditProfile = () => {
  const navigate = useNavigate();
  const { accessToken } = useRecoilValue(TokenAtom);
  const setUserInfo = useSetRecoilState(UserInfoAtom);

  const { data: profileData, isLoading, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: () => getMyMemberInfo(accessToken),
    retry: false,
    onSuccess: (data) => {

      setEditableProfileData(data);
    }
  });
  
  const [editableProfileData, setEditableProfileData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (profileData) {
      setEditableProfileData(profileData);
    }
  }, [profileData]);

  const handleChange = (e) => {
  const { name, value, files } = e.target;
  console.log(`Changing ${name} to`, files ? files[0] : value); // 로깅 확인

  // 여기서 상태를 업데이트할 때 입력 값이 빈 문자열일 경우에도 업데이트되도록 합니다.
  setEditableProfileData(prev => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  // 이미지 데이터와 나머지 데이터를 분리합니다.
  const { profileImage, id, ...requestData } = editableProfileData;

  const formData = new FormData();
  // 비이미지 데이터를 JSON으로 변환 후 Blob으로 만들어 'request' 키로 추가합니다.
  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' })
  );

  // 이미지 파일이 존재하면 'image' 키로 추가합니다.
  if (profileImage) {
    formData.append('image', profileImage);
  }

  try {
     const updatedProfile = await updateMyProfile(accessToken, formData); // 업데이트된 프로필 정보 받아오기
    setUserInfo(updatedProfile); // Recoil 상태 업데이트
    localStorage.setItem('userDetails', JSON.stringify(updatedProfile)); // 로컬 스토리지에 저장
    alert('프로필이 성공적으로 업데이트되었습니다.');
    navigate('/mypage')
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);
    alert('프로필 업데이트에 실패했습니다.');
  }
};


  // 데이터 로딩 중이거나 로딩 실패 시 메시지 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <main className="mt-20">
      <h2 className="text-3xl mb-10">나의 정보 수정</h2>
      <form onSubmit={handleSubmit} className="mx-2">
        <label className="">
          사진을 변경 하세요
          <input
            type="file"
            name="profileImage"
            className="file-input file-input-bordered file-input-info w-full max-w-xs mt-1"
            onChange={handleChange}
          />
        </label>

        <label disabled className="input input-bordered flex items-center gap-2 mb-2 mt-6">
            Email 변경
        <input
          placeholder="입력"
          type="email"
          name="email"
          className="grow"
          value={editableProfileData.email || ''}
          onChange={handleChange}
          />
        </label>
        
        <label className="input input-bordered flex items-center gap-2 mb-2">
            이름 변경:
          <input
            placeholder="입력"
            type="text"
            name="name"
            className="grow"
            value={editableProfileData.name||''}
            onChange={handleChange}
          />
            </label>
   

        <label className="input input-bordered flex items-center gap-2 mb-2">
    닉네임변경
    <input
            type="text"
            name="nickname"
            className="grow"
            placeholder="새로운 닉네임 입력"
            // editableProfileData에서 닉네임 필드의 값을 찾아 사용합니다.
            value={editableProfileData.nickname || ''}
            onChange={handleChange}
        />
    </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
            전화번호 변경:
          <input
            type="text"
            name="phoneNumber"
            className="grow"
            value={editableProfileData.phoneNumber || ''}
            onChange={handleChange}
            />
            </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          현위치 주소
          <input
            name="address"
            type="text"
            value={editableProfileData.address || ''}
            onChange={handleChange}
            className="grow"
            placeholder="abcd@site.com" />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
            나이 변경:
          <input
            type="number"
            name="age"
            className="grow"
            value={editableProfileData.age || ''}
            onChange={handleChange}
            />
            </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          자기소개
          <input
            name="description"
            type="text"
            value={editableProfileData.description || ''}
            onChange={handleChange}
            className="grow"
            placeholder="입력" />
          <span className="badge badge-info">Optional</span>
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          instagramID
          <input
            type="text"
            name="instagramId"
            value={editableProfileData.instagramId ||''}
            onChange={handleChange}
            className="grow"
            placeholder="입력" />
          <span className="badge badge-info">Optional</span>
        </label>


          <label className="input input-bordered flex items-center gap-2 mb-2">
            성별 변경:
          <select
            name="gender"
            className="grow"
            value={editableProfileData.gender || ''}
            onChange={handleChange}
            >
            <option value="">선택해주세요</option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
          </select>
            </label>
    
        <select className="select select-bordered w-full mt-6 max-w-xs"
        value={editableProfileData.mbti || ''}
        onChange={handleChange}
        name="mbti"
        >
          <option disabled>나의 MBTI를 골라주세요</option>
          <option>ISTJ</option>
          <option>ISFJ</option>
          <option>INFJ</option>
          <option>INTJ</option>
          <option>ISTP</option>
          <option>ISFP</option>
          <option>INFP</option>
          <option>INTP</option>
          <option>ESTP</option>
          <option>ESFP</option>
          <option>ENFP</option>
          <option>ENTP</option>
          <option>ESTJ</option>
          <option>ESFJ</option>
          <option>ENFJ</option>
          <option>ENTJ</option>
        </select>

        <button
          type="submit"
          className="btn btn-outline btn-info w-full mb-20 mt-10"
        >
          수정하기
        </button>
      </form>
    </main>
  );
};

export default EditProfile;

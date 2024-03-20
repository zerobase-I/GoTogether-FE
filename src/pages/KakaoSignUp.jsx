import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signUpWithKakao } from '/src/api/kakaoAuthAPI'; // 경로에 맞게 조정하세요.

const KakaoSignUp = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const { name, email, gender } = location.state?.userInfo || {};
    

    const [additionalInfo, setAdditionalInfo] = useState({
        name,
        email,
        gender,
        nickname: '',
        address: '',
        phoneNumber: '',
        age: '',
        mbti: '',
        instagramId: '',
        description: '',
    });
     useEffect(() => {
    if (!location.state?.userInfo) {
      navigate('/member');
    }
  }, [location.state?.userInfo, navigate]);

  const handleChange = (e) => {
    setAdditionalInfo({ ...additionalInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // signUpWithKakao 함수를 사용하여 카카오 회원가입 API 호출
      const data = await signUpWithKakao(additionalInfo);
      console.log(data); // 성공 응답 로그
      alert('회원가입 성공');
      navigate('/login'); // 성공 후 로그인 페이지 또는 메인 페이지로 이동
    } catch (error) {
      console.error('회원가입 에러', error);
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <h2>추가 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        {/* 각 입력 필드 구현 */}
        <input name="nickname" value={additionalInfo.nickname} onChange={handleChange} placeholder="닉네임" required />
        <input name="address" value={additionalInfo.address} onChange={handleChange} placeholder="주소" required />
        <input name="phoneNumber" value={additionalInfo.phoneNumber} onChange={handleChange} placeholder="전화번호" required />
        <input name="age" value={additionalInfo.age} onChange={handleChange} placeholder="나이" required />
        <input name="mbti" value={additionalInfo.mbti} onChange={handleChange} placeholder="MBTI (선택 사항)" />
        <input name="instagramId" value={additionalInfo.instagramId} onChange={handleChange} placeholder="Instagram ID (선택 사항)" />
        <textarea name="description" value={additionalInfo.description} onChange={handleChange} placeholder="자기소개 (선택 사항)" />
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default KakaoSignUp;
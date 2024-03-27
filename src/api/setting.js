import axios from 'axios';

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: 'https://gotogether.site/api',
});

export const deleteUser = async (accessToken) => {
  try {
    const response = await apiClient.patch('/member/withdraw', {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('회원탈퇴 요청 응답:', response.status); // 회원탈퇴 요청 응답 상태 코드 확인
    
    // 성공적으로 요청이 처리되었을 때
    if (response.status === 200) {
      console.log('회원탈퇴 성공');
      return '회원탈퇴가 성공적으로 처리되었습니다.';
    } else {
      // 예상치 못한 응답 코드를 받은 경우
      throw new Error(`서버로부터 예상치 못한 응답을 받았습니다: ${response.status}`);
    }
  } catch (error) {
    console.error('회원탈퇴 요청 중 오류:', error);
    throw new Error('회원탈퇴 처리에 실패했습니다.');
  }
};


export const logout = async (accessToken) => {
  try {
    // Request 본문에 accessToken 포함
    const response = await apiClient.post('/auth/logout', { accessToken });
    console.log('로그아웃 요청 응답:', response.data); // 로그아웃 요청 응답 확인
    return response.data;
  } catch (error) {
    console.error('로그아웃 요청 중 오류:', error);
    throw error; // 오류를 다시 던져서 호출자가 처리할 수 있도록 함
  }
};


export const getAlarmStatus = async (accessToken) => {
  try {
    const response = await apiClient.get('/member/alarm', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('알람 상태 조회 응답:', response.data);
    return response.data; // 알람 상태 (true 또는 false)
  } catch (error) {
    console.error('알람 상태 조회 중 오류:', error);
    throw new Error('알람 상태 조회에 실패했습니다.');
  }
};

export const toggleAlarmSetting = async (accessToken, alarmEnabled) => {
  try {
    const response = await apiClient.patch('/member/alarm', { alarmEnabled }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('알람 설정 변경 응답:', response.status); // HTTP 상태 코드 확인
    if (response.status === 200) {
      console.log('알람 설정이 성공적으로 변경되었습니다.');
      return true; // 성공적으로 변경됨
    } else {
      throw new Error('알람 설정 변경에 실패했습니다.');
    }
  } catch (error) {
    console.error('알람 설정 변경 중 오류:', error);
    throw new Error('알람 설정 변경에 실패했습니다.');
  }
};



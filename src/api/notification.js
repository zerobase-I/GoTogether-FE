import axios from 'axios';
import { BASE_URL, accessToken } from '../components/config/data';

// 받음 알림 조회
export const inQuiryNotification = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notification`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 알림 구독
export const subscribeNotification = async () => {
  try {
    await axios.get(`${BASE_URL}/notification/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// 알림 확인
export const checkedNotification = async (notificationId) => {
  console.log(notificationId);
  try {
    await axios.post(
      `${BASE_URL}/notification/${notificationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};

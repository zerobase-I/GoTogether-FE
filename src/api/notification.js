import { baseTokenAxios } from '../components/config/api';

// 받음 알림 조회
export const inQuiryNotification = async () => {
  try {
    const response = await baseTokenAxios.get(`/notification`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 알림 구독
export const subscribeNotification = async () => {
  try {
    await baseTokenAxios.get(`/notification/subscribe`);
  } catch (error) {
    console.error(error);
  }
};

// 알림 확인
export const checkedNotification = async (notificationId) => {
  console.log(notificationId);
  try {
    await baseTokenAxios.post(`/notification/${notificationId}`, {});
  } catch (error) {
    console.error(error);
  }
};

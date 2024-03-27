import { useMutation, useQuery } from '@tanstack/react-query';
import {
  checkedNotification,
  inQuiryNotification,
} from '../../api/notification';

const useNotification = () => {
  const inQuiryNotificationQuery = useQuery({
    queryKey: ['inQuiryNotification'],
    queryFn: inQuiryNotification,
  });

  const checkedNotificationMutation = useMutation({
    mutationFn: (notificationId) => checkedNotification(notificationId),
    onSuccess: () => console.log('알림확인 요청성공'),
  });

  return { inQuiryNotificationQuery, checkedNotificationMutation };
};

export default useNotification;

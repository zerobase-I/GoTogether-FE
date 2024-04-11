import { useQueryClient } from '@tanstack/react-query';
import { BASE_URL, accessToken } from '../config/api';
import { EventSourcePolyfill } from 'event-source-polyfill';

const useSSE = () => {
  const queryClient = useQueryClient();

  const startSSE = () => {
    const connectSSE = () => {
      const sse = new EventSourcePolyfill(
        `${BASE_URL}/notification/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      sse.onopen = async () => {
        await queryClient.invalidateQueries(['inQuiryNotification']);
        console.log('The connection has been established.');
      };

      sse.onmessage = async () => {
        try {
          await queryClient.invalidateQueries(['inQuiryNotification']);
        } catch (error) {
          console.error('Error parsing JSON data:', error);
        }
      };

      sse.onerror = () => {
        // console.error('SSE Error:', error)
        sse.close();
      };

      return sse;
    };

    let sseInstance = connectSSE();

    const intervalId = setInterval(() => {
      if (sseInstance.readyState === EventSource.CLOSED) {
        console.log('SSE 연결 실패. 다시 연결 시도 중...');
        sseInstance.close();
        sseInstance = connectSSE();
      }
    }, 1000 * 45);

    return () => {
      clearInterval(intervalId);
      sseInstance.close();
    };
  };

  return { startSSE };
};

export default useSSE;

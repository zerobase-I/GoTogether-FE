import { useNavigate } from 'react-router-dom';
import { sampleImgHands } from './config/sampleImg';
import useNotification from './hooks/useNotification';

const AlarmBox = ({ notificationId, postTitle, postId }) => {
  const { checkedNotificationMutation } = useNotification();

  const navigate = useNavigate();
  const goToReviewDetail = () => {
    navigate('/review', { state: postId });
  };

  const handleClick = () => {
    checkedNotificationMutation.mutate(notificationId, {
      onSuccess: () => {
        console.log('알림 확인 네트워크 요청 성공');
        goToReviewDetail();
      },
      onError: () => {
        alert('네트워크 오류로 확인이 실패했습니다. 다시 클릭해주세요!');
      },
    });
  };

  return (
    <section className=" mb-4 mt-4 mx-4  shadow-lg rounded-md ">
      <div onClick={handleClick}>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <img
              src={sampleImgHands}
              alt="손잡는 사진"
              className="basis-1/12 w-24  md:w-40"
            />
            <div className="flex flex-col items-start justify-around basis-10/12 ">
              <div>
                <h3 className="text-sm mt-4 mb-2 md:text-2xl ml-4  font-semibold">
                  관리자
                </h3>
              </div>
              <div className="ml-4 mb-4 font-light text-xs md:text-sm inline-block    text-left line-clamp-3  ">
                <span className="text-xl text-blue-400">
                  글제목: {postTitle}
                </span>
                <br />
                <span className="text-gray-400">
                  친구들과 같이 여행을 재밌게 즐기고 오셨나요?😀{' '}
                </span>
                <br />
                <span className="text-gray-400">
                  친구들의 후기를 남겨보세요.✔{' '}
                </span>
              </div>
            </div>
            <div className="text-xs  mt-2 mr-2 justify-items-end w-1/4  ss:basis-2/12 md:text-sm">
              12:00 PM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlarmBox;

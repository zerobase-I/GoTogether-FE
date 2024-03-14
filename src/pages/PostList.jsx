import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usePosts from '../components/hooks/usePosts';
import useAccompany from '../components/hooks/useAccompany';

import { postAccompany, postCancelAccompany } from '../api/accompany';

//임시 데이터 : 로그인한 유저 고유정보 email
// 게시글 1번 - 본인작성게시물 가정
const LOGIN_INFO = 'BBBB@naver.com';
// 로그인정보 전역상태로 저장시 지울예정

const PostList = () => {
  const { deletePostMutation } = usePosts();
  const {
    state: {
      post: {
        title,
        category,
        startDate,
        finishDate,
        gender,
        travelCountry,
        travelCity,
        minimumAge,
        maximumAge,
        recruitsPeople,
        estimatedTravelExpense,
        content,
        image,
        id,
        memberId,
        userEmail,
      },
    },
  } = useLocation();

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  // 요청을 보냈나?
  //true: 보냄 / false: 안보냄
  // 내 게시물일 경우 ? 채팅방으로(버튼텍스트)
  const [isRequest, setIsRequest] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);

  const {
    getRequestListQuery: { isLoading, error, data: requestList },
  } = useAccompany();

  isLoading && console.log(isLoading);
  error && console.log(error.message);

  useEffect(() => {
    // 사용자가 게시글 페이지 처음 들어왔을경우,  버튼의 초기 상태를 알아야함
    // 본인 게시글(채팅방으로) / 동행요청 / 요청취소

    // 4. 게시글이 내 게시물일 경우, "채팅방으로" 버튼으로 보여야 함
    if (LOGIN_INFO === userEmail) {
      setIsMyPost(true);
      return;
    }

    //1. 내가 보낸 동행 요청 목록을 get한다.
    // 1-1. 요청 목록에서 requestedMemberId (게시글 작성자 고유 아이디) 값을 얻는다.
    //2. 현재 페이지의 게시글 작성자의 id와 비교한다.
    const isMatched =
      requestList &&
      requestList.filter((item) => item.requestedMemberId === memberId);

    //2-1.  게시글 작성자의 id 와  비교해서 같은게 있으면, 동행 요청 버튼이 "동행 취소" 버튼으로 보여야함
    //3. 같은게 없으면, "동행 요청 버튼으로 보여야 함"
    if (isMatched && isMatched.length) {
      setIsRequest(true);
    } else {
      setIsRequest(false);
    }
  }, [requestList, memberId, userEmail]);

  const handleRequestBtnClick = (e) => {
    //     1. 버튼이 "동행 요청" 일 경우,
    // 1-1. 동행요청 post 요청을 보낸다.
    // 1-2. 동행 요청 페이지에서 해당 동행 요청 내역이 확인 가능해야 한다.

    //     2. 버튼이 "동행 취소" 일 경우, 동행취소 post 요청을 보낸다.
    // 2-1. 동행 요청 페이지에서 해당 동행 요청 내역이 보이면 안된다.
    console.log('동행요청 버튼 클릭');
    console.log(e.target.innerText === '동행요청');

    if (e.target.innerText === '동행요청') {
      postAccompany(id, memberId);
      setIsRequest(false);
    } else {
      postCancelAccompany(requestList && requestList.id);
      setIsRequest(true);
    }
  };

  const handleEditClick = () => {
    console.log('Edit 버튼 클릭');
    //1. 글쓰기 페이지로 이동
    // 이동시, 현재 데이터들을 넘겨준다.
    navigate(`/updatePostList/${id}`, { state: { id } });
  };

  const handleDeleteClick = () => {
    console.log('delete 버튼 클릭');
    try {
      // 서버로 POST 요청 보내기
      deletePostMutation.mutate(id, {
        onSuccess: () => {
          alert('성공적으로 게시글이 삭제되었습니다 ');
          goToHome();
        },
      });
      console.log('데이터 삭제 성공');
    } catch (error) {
      console.error('데이터 삭제 실패', error);
    }
  };

  return (
    <article className="mx-4 mt-4">
      <div className="flex justify-between mb-4 text-gray-500">
        <div>
          <span className="mr-2">작성자</span>
          <span>글작성날짜</span>
        </div>
        <div>
          <button onClick={handleEditClick} className="mr-2 text-gray-500">
            수정
          </button>
          <button onClick={handleDeleteClick} className="text-gray-500">
            삭제
          </button>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl mx-1">
        <figure className="h-50 w-full">
          <img
            src="data:image/jpeg;base64,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"
            alt="샘플이미지"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title flex flex-col">
            {title}
            <div className="badge badge-secondary">NEW</div>
            <span className="badge badge-outline">{category}</span>
          </h2>
          <section>
            <div className="text-start text-lg">
              동행인원 : 2/{recruitsPeople}
            </div>
            <div className="flex">
              <div className="mr-4">
                <img
                  src="https://via.placeholder.com/30"
                  alt=""
                  className="rounded-full"
                />
                <span>조이</span>
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/30"
                  alt=""
                  className="rounded-full"
                />
                <span>순신</span>
              </div>
            </div>
          </section>

          <p className="mt-10">🚀 자세한 여행 정보</p>
          <div className="card-actions justify-end"></div>
          <div>
            <p className="test-sm">
              {travelCountry}: {travelCity}
            </p>
            <p className="test-sm">
              {startDate} ~ {finishDate}
            </p>
            <p className="test-sm">현재인원/모집인원: 2/{recruitsPeople}</p>
            <p className="test-sm">
              {gender} , 나이: {minimumAge} ~ {maximumAge}
            </p>
            <p className="test-sm">{category}</p>
            <p className="test-sm">예상 금액 : {estimatedTravelExpense}</p>
          </div>
          <div className="border-t mt-10">
            <span className="mt-10">{content}</span>
          </div>
        </div>
      </div>
      {isMyPost && (
        <button
          type="submit"
          className="btn btn-outline  btn-success w-full mb-20 "
          onClick={() => navigate(`/chatroom/${id}`)}
        >
          채팅방으로
        </button>
      )}
      {isMyPost || isRequest || (
        <button
          type="submit"
          className="btn btn-outline btn-error w-full mb-20 "
          onClick={handleRequestBtnClick}
        >
          요청취소
        </button>
      )}
      {isMyPost ||
        (isRequest && (
          <button
            type="submit"
            className="btn btn-outline btn-info w-full mb-20"
            onClick={handleRequestBtnClick}
          >
            동행요청
          </button>
        ))}
    </article>
  );
};

export default PostList;

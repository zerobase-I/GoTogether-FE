import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usePosts from '../components/hooks/usePosts';
import useAccompany from '../components/hooks/useAccompany';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../recoil/userInfoAtom';

import moment from 'moment';
import { IoRocketOutline } from 'react-icons/io5';
import { sampleImage } from '../components/config/sampleImg';

//임시 데이터 : 로그인한 유저 고유정보 email
// 게시글 1번 - 본인작성게시물 가정
// const LOGIN_INFO = 'BBBB@naver.com';
// 로그인정보 전역상태로 저장시 지울예정

const PostList = () => {
  const { deletePostMutation } = usePosts();
  const userInfo = useRecoilValue(UserInfoAtom);
  const loginUserEmail = userInfo.email;
  //const loginUserId = userInfo.id;

  const {
    state: {
      post: {
        title,
        category,
        startDate,
        endDate,
        gender,
        travelCountry,
        travelCity,
        minimumAge,
        maximumAge,
        recruitsPeople,
        estimatedTravelExpense,
        content,
        imagesUrl,
        createdAt,
        id: postId,
        memberId: postAuthorId,
        userEmail: postUserEmail, //post 작성자 email
      },
    },
  } = useLocation();

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  console.log(title);

  console.log(imagesUrl && imagesUrl);
  const [isRequest, setIsRequest] = useState(false); // 요청유무
  const [isMyPost, setIsMyPost] = useState(false); //내 게시물 유무

  const { requestAccompany, requestCancleAccompany } = useAccompany();
  const [isBtnClick, setIsBtnClick] = useState(false);
  const [cancelId, setCancelId] = useState(null); // 취소요청 내역 고유 아이디

  const {
    getRequestListQuery: { data: requestList },
  } = useAccompany();

  useEffect(() => {
    if (loginUserEmail === postUserEmail) {
      setIsMyPost(true);
      return;
    }

    console.log(requestList && requestList);

    const isMatched =
      requestList &&
      requestList.some(
        (item) =>
          item.requestedMemberId === postAuthorId && item.postId === postId,
      );

    console.log(isMatched);

    if (isMatched) {
      const findMatchedPost =
        requestList && requestList.find((item) => item.postId === postId);
      console.log(findMatchedPost);
      requestList && setCancelId(findMatchedPost && findMatchedPost.id);
    }

    //2-1.  게시글 작성자의 id 와  비교해서 같은게 있으면, 동행 요청 버튼이 "동행 취소" 버튼으로 보여야함
    //3. 같은게 없으면, "동행 요청 버튼으로 보여야 함"
    if (isMatched) {
      setIsRequest(true);
    } else {
      setIsRequest(false);
    }
  }, [requestList, cancelId]);
  console.log(cancelId && cancelId);

  const handleRequestBtnClick = (e) => {
    //     1. 버튼이 "동행 요청" 일 경우,
    // 1-1. 동행요청 post 요청을 보낸다.
    // 1-2. 동행 요청 페이지에서 해당 동행 요청 내역이 확인 가능해야 한다.

    //     2. 버튼이 "동행 취소" 일 경우, 동행취소 post 요청을 보낸다.
    // 2-1. 동행 요청 페이지에서 해당 동행 요청 내역이 보이면 안된다.
    console.log('동행요청 버튼 클릭');

    if (e.target.innerText === '동행요청') {
      setIsBtnClick(true);
      requestAccompany.mutate(
        { postId, postAuthorId },
        {
          onSuccess: () => {
            setTimeout(() => {
              setIsRequest(true);
              setIsBtnClick(false);
              alert('동행 요청 성공!.');
            }, 1000);
          },
          onError: () => {
            console.log('동행 요청 실패');
          },
        },
      );
    } else {
      setIsBtnClick(true);
      requestCancleAccompany.mutate(cancelId, {
        onSuccess: () => {
          setTimeout(() => {
            setIsRequest(false);
            setIsBtnClick(false);
            alert('동행 요청 취소 완료!.');
          }, 1000);
        },
        onError: () => {
          console.log(' 동행 요청취소 실패');
        },
      });
    }
  };

  const handleEditClick = () => {
    //1. 글쓰기 페이지로 이동 -> 이동시, 현재 데이터들을 넘겨준다.
    navigate(`/updatePostList/${postId}`, {
      state: {
        title,
        category,
        startDate,
        endDate,
        gender,
        travelCountry,
        travelCity,
        minimumAge,
        maximumAge,
        recruitsPeople,
        estimatedTravelExpense,
        content,
        imagesUrl,
        postId,
        postAuthorId,
      },
    });
  };

  const handleDeleteClick = () => {
    try {
      deletePostMutation.mutate(postId, {
        onSuccess: () => {
          alert('성공적으로 게시글이 삭제되었습니다 ');
          goToHome();
        },
      });
    } catch (error) {
      console.error('데이터 삭제 실패', error);
    }
  };

  console.log(imagesUrl);

  return (
    <article className="mx-4 mt-4">
      <div className="flex justify-between mb-4 text-gray-500">
        <div className="flex flex-col  ">
          <span className="mr-16 text-sm">
            {moment(createdAt).format('YYYY-MM-DD HH:MM')}
          </span>
          <span className="mr-10 items-start">작성자: {postUserEmail}</span>
          <span className="mr-10 items-start">게시글id: {postId}</span>
        </div>
        <div>
          {isMyPost && (
            <button onClick={handleEditClick} className="mr-2 text-gray-500">
              수정
            </button>
          )}
          {isMyPost && (
            <button onClick={handleDeleteClick} className="text-gray-500">
              삭제
            </button>
          )}
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl mx-1">
        <figure className="h-50 w-full">
          <img
            className="w-60"
            src={imagesUrl && imagesUrl.length > 0 ? imagesUrl : sampleImage}
            alt="샘플이미지"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title flex flex-col">
            {title}
            <div className="badge badge-secondary">모집성별 {gender}</div>
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

          <p className="mt-10 text-xl md:text-2xl flex justify-center">
            <IoRocketOutline className="mr-2" />
            자세한 여행 정보
          </p>
          <div className="card-actions justify-end"></div>
          <div>
            <p className="test-sm">
              {travelCountry}: {travelCity}
            </p>
            <p className="test-sm">
              {moment(startDate).format('YYYY-MM-DD')} ~{' '}
              {moment(endDate).format('YYYY-MM-DD')}
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
          onClick={() => navigate(`/chatroom/${postId}`)}
        >
          채팅방으로
        </button>
      )}
      {isMyPost ||
        (isRequest && (
          <button
            type="submit"
            className="btn btn-outline btn-error w-full mb-20 "
            onClick={handleRequestBtnClick}
            disabled={isBtnClick}
          >
            요청취소
          </button>
        ))}
      {isMyPost || isRequest || (
        <button
          type="submit"
          className="btn btn-outline btn-info w-full mb-20"
          onClick={handleRequestBtnClick}
          disabled={isBtnClick}
        >
          동행요청
        </button>
      )}
    </article>
  );
};

export default PostList;

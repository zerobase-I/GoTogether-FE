import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getPosts, updatePost } from '../api/postApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { VscZoomIn } from 'react-icons/vsc';
import SelectCountry from '../components/SelectCountry';
import ReactCalendar from '../components/ReactCalendar';
import RadioBtn from '../components/RadioBtn';
import RadioBtnSingle from '../components/Ui/RadioBtnSingle';
import EditorQuill from '../components/EditorQuill';
import { ImageUpload2 } from '../api/ImageUpload2';
import { categoryList } from '../components/config/data';

const date = new Date();
const formatDate = moment(date.toDateString()).format('MM-DD-YYYY');

const UpdatePostList = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: postData,
  } = useQuery({
    queryKey: ['post'],
    queryFn: getPosts,
  });

  const [success, setSuccess] = useState(); // 업로드 성공/ 실패 상태
  const {
    state: { id: postId },
  } = useLocation();

  const [inputs, setInputs] = useState({
    travelCountry: '',
    travelCity: '',
    startDate: '',
    finishDate: '',
    gender: '',
    minimumAge: '',
    maximumAge: '',
    recruitsPeople: '',
    estimatedTravelExpense: '',
    category: '',
    title: '',
    content: '',
    image: [],
  });

  console.log(inputs);

  useEffect(() => {
    isLoading && console.log('Loading중입니다.');
    error && console.log(error.message);

    postData &&
      setInputs({
        travelCountry: postData && postData[postId].travelCountry,
        travelCity: postData && postData[postId].travelCity,
        startDate: postData && postData[postId].finishDate,
        finishDate: formatDate,
        gender: postData && postData[postId].gender,
        minimumAge: postData && postData[postId].minimumAge,
        maximumAge: postData && postData[postId].maximumAge,
        recruitsPeople: postData && postData[postId].recruitsPeople,
        estimatedTravelExpense:
          postData && postData[postId].estimatedTravelExpense,
        category: postData && postData[postId].category,
        title: postData && postData[postId].title,
        content: postData && postData[postId].content,
        image: postData && postData[postId].image,
      });
  }, [isLoading, error, postId, postData]); // inputs 상태가 변경될 때마다 실행

  // inputs 변경시 테스트 코드
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const createPostMutation = useMutation({
    mutationFn: (inputs) => updatePost(inputs, postId),
    onSuccess: () => queryClient.invalidateQueries(['post']),
  });

  const handleDateChange = (dates) => {
    setInputs(() => ({
      ...inputs,
      startDate: moment(dates[0].toDateString()).format('MM-DD-YYYY'),
      finishDate: moment(dates[1].toDateString()).format('MM-DD-YYYY'),
    }));
  };

  const handleFileChange = (files) => {
    setInputs(() => ({
      ...inputs,
      image: files,
    }));
  };

  const handleQuillTextChange = (text) => {
    setInputs(() => ({
      ...inputs,
      content: text,
    }));
  };

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit 이벤트 발생');

    const formData = new FormData();

    for (const key in inputs) {
      if (key === 'image' && inputs.image.length) {
        for (let i = 0; i < inputs.image.length; i++) {
          formData.append('image', inputs.image[i]);
        }
      } else {
        formData.append(key, inputs[key]);
      }
    }

    console.log(formData);

    try {
      // 서버로 POST 요청 보내기
      createPostMutation.mutate(formData, {
        onSuccess: () => {
          setSuccess('성공적으로 게시글이 수정되었습니다.');
          alert('성공적으로 게시글이 수정되었습니다 ');
          goToHome();
          setTimeout(() => {
            setSuccess(null);
          }, 1000);
        },
      });
      console.log('데이터 업로드 성공');
    } catch (error) {
      console.error('데이터 업로드 실패', error);
    }
  };

  return (
    <main className="flex flex-col mx-4 mt-4">
      <form onSubmit={handleSubmit}>
        <section className="mt-2 mb-10 border-t border-b">
          <Link to="/guide" className="w-full h-6 mb-10 ">
            <div className="flex justify-center items-center">
              <span className="text-xl font-bold">
                {' '}
                작성 가이드로(화면이동) 구현X
              </span>
              <span>
                <VscZoomIn />
              </span>
            </div>
          </Link>
        </section>

        <SelectCountry
          onChange={handleChangeInfo}
          beforeCountry={inputs.travelCountry}
          beforeCity={inputs.travelCity}
        />

        <ReactCalendar
          onDateChange={handleDateChange}
          /* 날짜 수정시 자동선택 구현해야함() */
          startDate={postData && postData[postId].startDate}
          finishDate={postData && postData[postId].finishDate}
        />

        <section className="mb-2">
          <span className="text-xl text-left font-semibold w-max block ">
            함께하고 싶은 성별
          </span>
          <RadioBtn
            option1="모두 포함"
            option2="동일 성별"
            name="gender"
            onChange={handleChangeInfo}
            beforeGender={postData && postData[postId].gender}
          />
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-1">
            함께하고 싶은 나이대
          </span>
          <div className="flex flex-col items-center flex-grow-1">
            <input
              type="number"
              placeholder="최소 나이 (18세 이상)"
              className="input input-bordered input-info w-full max-w-xs mb-1"
              min={18}
              max={100}
              required
              onChange={handleChangeInfo}
              name="minimumAge"
              value={inputs.minimumAge}
            />
            <input
              type="number"
              placeholder="최대 나이 (100세 이하)"
              className="input input-bordered input-info w-full max-w-xs "
              min={18}
              max={100}
              required
              onChange={handleChangeInfo}
              name="maximumAge"
              value={inputs.maximumAge}
            />
          </div>
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-2">
            모집 인원(본인포함) : {inputs.recruitsPeople} 명
          </span>
          <input
            type="range"
            min="2"
            max="10"
            step="1"
            name="recruitsPeople"
            value={inputs.recruitsPeople}
            onChange={handleChangeInfo}
            className="range range-info"
          />
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-2">
            카테고리를 선택하세요
          </span>
          {categoryList.map((category) => (
            <RadioBtnSingle
              option={category}
              name="category"
              key={category}
              onChange={handleChangeInfo}
            />
          ))}
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-1">
            예상 여행 경비
          </span>
          <div className="flex flex-col items-center flex-grow-1">
            <input
              type="number"
              placeholder="예상 여행 경비 1000원 단위 (숫자 입력)"
              className="input input-bordered input-info w-full max-w-xs "
              required
              onChange={handleChangeInfo}
              name="estimatedTravelExpense"
              step="1000"
              value={inputs.estimatedTravelExpense}
            />
          </div>
        </section>

        <section className="mb-24">
          <label className="text-xl w-full text-left font-semibold block mb-2">
            제목/내용을 입력하세요
          </label>
          <input
            type="text"
            placeholder="제목 "
            className="input input-bordered input-info w-full max-w-full mb-1"
            required
            minLength="4"
            maxLength="40"
            name="title"
            onChange={handleChangeInfo}
            value={inputs.title}
          />
          <EditorQuill
            onTextChange={handleQuillTextChange}
            value={inputs.content}
          />
        </section>

        <section className="mb-16">
          <label
            className="text-xl w-full text-left font-semibold  mb-2 flex flex-col"
            id="upLoadFile"
          >
            <span className="mb-4">
              글 최상단에 보여질 이미지를 설정해 보세요!
            </span>
            <ImageUpload2
              onFileChange={handleFileChange}
              value={inputs.image}
            />
          </label>
        </section>
        <p>{success}</p>
        <button type="submit" className="btn btn-outline btn-info w-full mb-20">
          수정하기
        </button>
      </form>
    </main>
  );
};

export default UpdatePostList;

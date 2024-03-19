import { Link, useNavigate } from 'react-router-dom';
import { VscZoomIn } from 'react-icons/vsc';
import React, { useEffect, useState } from 'react';
import ReactCalendar from '../components/ReactCalendar';
import RadioBtn from '../components/RadioBtn';
import RadioBtnSingle from '../components/Ui/RadioBtnSingle';
import EditorQuill from '../components/EditorQuill';
import { categoryList } from '../components/config/data';
import SelectCountry from '../components/SelectCountry';
import moment from 'moment';
import { ImageUpload2 } from '../api/ImageUpload2';
import usePosts from '../components/hooks/usePosts';

const date = new Date();
const formatDate = moment(date.toDateString()).format('MM-DD-YYYY');

const CreatePost = () => {
  const { createPostMutation } = usePosts();
  const [success, setSuccess] = useState(); // 업로드 성공/ 실패 상태
  const [inputs, setInputs] = useState({
    travelCountry: '한국',
    travelCity: '서울',
    startDate: formatDate,
    finishDate: formatDate,
    gender: '',
    minimumAge: '18',
    maximumAge: '100',
    recruitsPeople: '6',
    estimatedTravelExpense: '',
    category: '',
    title: '',
    content: '',
    image: [],
  });

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  /* inputs 출력 테스트 코드 */
  useEffect(() => {
    console.log(inputs); // 상태가 업데이트된 후에 실행됨
  }, [inputs]); // inputs 상태가 변경될 때마다 실행

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

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

    const newPost = {};
    for (const [key, value] of formData.entries()) {
      newPost[key] = value;
    }
    console.log(newPost);

    try {
      // 서버로 POST 요청 보내기
      createPostMutation.mutate(formData, {
        onSuccess: () => {
          setSuccess('성공적으로 게시글이 등록되었습니다.');
          alert('성공적으로 게시글이 등록되었습니다 ');
          goToHome();
          setTimeout(() => {
            setSuccess(null);
          }, 1000);
        },
      });
    } catch (error) {
      console.error('데이터 업로드 실패', error);
    }
  };

  return (
    <main className="flex flex-col mx-4 mt-4">
      <form onSubmit={handleSubmit}>
        <section className="mt-2 mb-10 border-t border-b">
          <Link to="" className="w-full h-6 mb-10 ">
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

        <SelectCountry onChange={handleChangeInfo} />
        <ReactCalendar onDateChange={handleDateChange} />

        <section className="mb-2">
          <span className="text-xl text-left font-semibold w-max block ">
            함께하고 싶은 성별
          </span>
          <RadioBtn
            option1="모두 포함"
            option2="동일 성별"
            name="gender"
            onChange={handleChangeInfo}
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
          />
          <EditorQuill onTextChange={handleQuillTextChange} />
        </section>

        <section className="mb-16">
          <label
            className="text-xl w-full text-left font-semibold  mb-2 flex flex-col"
            id="upLoadFile"
          >
            <span className="mb-4">
              글 최상단에 보여질 이미지를 설정해 보세요!
            </span>
            <ImageUpload2 onFileChange={handleFileChange} />
          </label>
        </section>
        <p>{success}</p>
        <button type="submit" className="btn btn-outline btn-info w-full mb-20">
          등록하기
        </button>
      </form>
    </main>
  );
};

export default CreatePost;

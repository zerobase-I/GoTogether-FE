import React, { useEffect, useState } from 'react';
import ReactCalendar from '../components/ReactCalendar';
import RadioBtn from '../components/RadioBtn';
import EditorQuill from '../components/EditorQuill';
import { categoryLists, genders } from '../components/config/data';
import SelectCountry from '../components/SelectCountry';
import moment from 'moment';
import { ImageUpload2 } from '../api/ImageUpload2';
import usePosts from '../components/hooks/usePosts';
import RadioBtnCategory from '../components/Ui/RadioBtnCategory';
import { useGoToPage } from '../utils/utils';

const CreatePost = () => {
  const { goToHome } = useGoToPage();
  const { createPostMutation } = usePosts();
  const [success, setSuccess] = useState(); // 업로드 성공/ 실패 상태
  const [inputs, setInputs] = useState({
    travelCountry: 'KOREA',
    travelCity: 'SEOUL',
    startDate: moment(new Date().toDateString()).format('YYYY-MM-DDTHH:mm:ss'),
    endDate: moment(new Date().toDateString()).format('YYYY-MM-DDTHH:mm:ss'),
    postGenderType: '',
    minimumAge: '18',
    maximumAge: '100',
    recruitsPeople: '6',
    estimatedTravelExpense: '0',
    postCategory: '',
    title: '',
    content: '',
    image: [],
  });

  /*ㅡㅡㅡㅡ inputs 출력 테스트 코드ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
  useEffect(() => {
    console.log(inputs); // 상태가 업데이트된 후에 실행됨
  }, [inputs]); // inputs 상태가 변경될 때마다 실행
  /* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleCityChange = (firstSelectCity) => {
    setInputs({ ...inputs, travelCity: firstSelectCity });
  };

  const handleDateChange = (dates) => {
    setInputs(() => ({
      ...inputs,
      startDate: moment(dates[0].toDateString()).format('YYYY-MM-DDTHH:mm:ss'),
      endDate: moment(dates[1].toDateString()).format('YYYY-MM-DDTHH:mm:ss'),
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
    if (inputs.content === '') {
      alert('내용을 입력해주세요!');
      return;
    } else if (inputs.postGenderType === '') {
      alert('원하는 성별을 선택해주세요');
      return;
    } else if (inputs.postCategory === '') {
      alert('카테고리를 선택해 주세요!');
      return;
    }
    console.log('createPost submit 이벤트 발생');

    const formData = new FormData();

    for (const key in inputs) {
      if (key === 'image' && inputs.image && inputs.image.length) {
        for (let i = 0; i < inputs.image.length; i++) {
          formData.append('image', inputs.image[i]);
        }
      } else {
        formData.append(key, inputs[key]);
      }
    }

    createPostMutation.mutate(formData, {
      onSuccess: () => {
        setSuccess('성공적으로 게시글이 등록되었습니다.');
        alert('성공적으로 게시글이 등록되었습니다 ');
        goToHome();
        setTimeout(() => {
          setSuccess(null);
        }, 1000);
      },
      onError: () => {
        alert('post요청 네트워크 에러 발생했습니다. 다시 등록해주세요!');
      },
    });
  };

  return (
    <main className="flex flex-col mx-4 mt-4">
      <form onSubmit={handleSubmit}>
        <SelectCountry
          onChange={handleChangeInfo}
          onCityChange={handleCityChange}
          beforeCountry={inputs.travelCountry}
          beforeCity={inputs.travelCity}
        />
        <ReactCalendar
          onDateChange={handleDateChange}
          startDate={inputs.startDate}
          finishDate={inputs.endDate}
        />

        <section className="mb-2">
          <span className="text-xl text-left font-semibold w-max block ">
            함께하고 싶은 성별
          </span>
          <div className="flex">
            {genders.map((gender) => {
              return (
                <RadioBtn
                  key={Object.keys(gender)}
                  option={gender}
                  name="postGenderType"
                  onChange={handleChangeInfo}
                />
              );
            })}
          </div>
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-1">
            함께하고 싶은 나이대
          </span>
          <div className="flex flex-col items-center flex-grow-1">
            <input
              type="number"
              placeholder="최소 나이 (18세 이상)"
              className="input input-bordered input-info w-full max-w-xs mb-1 border-blue-500 border-2"
              min={18}
              max={100}
              required
              onChange={handleChangeInfo}
              name="minimumAge"
              defaultValue="18"
            />
            <input
              type="number"
              placeholder="최대 나이 (100세 이하)"
              className="input input-bordered input-info w-full max-w-xs border-blue-500 border-2"
              min={18}
              max={100}
              required
              onChange={handleChangeInfo}
              name="maximumAge"
              defaultValue="100"
            />
          </div>
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-2 ">
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
          <div className="flex flex-col md:flex-row ">
            {categoryLists.map((category) => (
              <RadioBtnCategory
                option={category}
                name="postCategory"
                key={Object.keys(category)}
                onChange={handleChangeInfo}
              />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-1">
            예상 여행 경비
          </span>
          <div className="flex flex-col items-center flex-grow-1">
            <input
              type="number"
              placeholder="예상 여행 경비 1000원 단위 (숫자 입력)"
              className="input input-bordered input-info w-full max-w-xs border-2 border-blue-500 "
              required
              onChange={handleChangeInfo}
              name="estimatedTravelExpense"
              step="1000"
              defaultValue="0"
            />
          </div>
        </section>

        <section className="mb-24">
          <label className="text-xl w-full text-left font-semibold block mb-2">
            제목/내용을 입력하세요
          </label>
          <input
            className="input input-bordered input-info w-full max-w-full mb-1 border-blue-500 border-2"
            type="text"
            placeholder="제목 "
            required
            minLength="4"
            maxLength="40"
            name="title"
            onChange={handleChangeInfo}
          />
          {/* 내용 빈 문자열일시 서버에러 -> alert로 막아놈 */}
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

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { VscZoomIn } from 'react-icons/vsc';
import SelectCountry from '../components/SelectCountry';
import ReactCalendar from '../components/ReactCalendar';
import RadioBtn from '../components/RadioBtn';
import RadioBtnSingle from '../components/Ui/RadioBtnSingle';
import EditorQuill from '../components/EditorQuill';
import { ImageUpload2 } from '../api/ImageUpload2';
import { categoryLists, genders } from '../components/config/data';
import usePosts from '../components/hooks/usePosts';
import Loading from '../components/Loading';

const UpdatePostList = () => {
  const { UpdatePostMutation } = usePosts();
  const [success, setSuccess] = useState(); // 업로드 성공/ 실패 상태
  const {
    state: {
      post: {
        postId,
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
      },
    },
  } = useLocation();

  console.log(postId);

  const [inputs, setInputs] = useState({
    travelCountry: travelCountry,
    travelCity: travelCity,
    startDate: startDate,
    endDate: endDate,
    gender: gender,
    minimumAge: minimumAge,
    maximumAge: maximumAge,
    recruitsPeople: recruitsPeople,
    estimatedTravelExpense: estimatedTravelExpense,
    category: category,
    title: title,
    content: content,
    newImages: '',
    imageIdsToDelete: '',
  });

  console.log(inputs);

  // inputs 변경시 테스트 코드
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const handleDateChange = (dates) => {
    setInputs(() => ({
      ...inputs,
      startDate: moment(dates[0].toDateString()).format('MM-DD-YYYY'),
      endDate: moment(dates[1].toDateString()).format('MM-DD-YYYY'),
    }));
  };

  const handleFileChange = (files) => {
    setInputs(() => ({
      ...inputs,
      newImages: files,
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

  const handleCityChange = (firstSelectCity) => {
    setInputs({ ...inputs, travelCity: firstSelectCity });
  };

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
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
    console.log('submit 이벤트 발생');

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

    UpdatePostMutation.mutate(
      { formData, postId },
      {
        onSuccess: () => {
          setSuccess('성공적으로 게시글이 수정되었습니다.');
          alert('성공적으로 게시글이 수정되었습니다 ');
          goToHome();
          setTimeout(() => {
            setSuccess(null);
          }, 1000);
        },
        onError: () => {
          alert('게시글 수정이 네트워크 문제로 실패했습니다 다시시도해주세요!');
        },
      },
    );
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
          /* 날짜 수정시 자동선택 구현해야함() */
          startDate={inputs.startDate}
          endDate={inputs.endDate}
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
                  beforeGender={inputs.gender}
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
          <div className="flex flex-col md:flex-row ">
            {categoryLists.map((category) => (
              <RadioBtnSingle
                option={category}
                name="category"
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

import { Link } from 'react-router-dom';
import { VscZoomIn } from 'react-icons/vsc';
import React, { useState } from 'react';
import ReactCalendar from '../components/ReactCalendar';
import RadioBtn from '../components/RadioBtn';
import RadioBtnSingle from '../components/Ui/RadioBtnSingle';
import EditorQuill from '../components/EditorQuill';
import { categoryList } from '../components/config/data';

const CreatePost = () => {
  const [recruitedPeople, setRecruitedPeople] = useState(6);

  const handleInputChange = (e) => {
    setRecruitedPeople(e.target.value);
  };

  return (
    <main className="flex flex-col mx-4">
      <form action="/" method="post" name="createpost" acceptCharset="UTF-8">
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

        <section className="flex flex-col items-center mt-3  ">
          <span className="text-xl w-full text-left font-semibold">
            나라와 도시를 선택하세요
          </span>
          <div className="">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  나라를 선택하세요 (API 찾아보기)
                </span>
              </div>
              <select
                className="select select-bordered"
                name="country"
                required
              >
                <option value="한국">한국</option>
                <option value="일본">일본</option>
                <option value="미국">미국</option>
                <option value="괌">괌</option>
                <option value="사이판">사이판</option>
                <option value="캐나다">캐나다</option>
                <option value="대만">대만</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  도시를 선택하세요 (API 찾아보기)
                </span>
              </div>
              <select
                className="select select-bordered"
                name="country"
                required
              >
                <option value="서울">서울</option>
                <option value="강릉">강릉</option>
                <option value="가평/양평">가평/양평</option>
              </select>
            </label>
          </div>
        </section>

        <section className="mb-6">
          <ReactCalendar />
        </section>

        <section className="mb-2">
          <span className="text-xl text-left font-semibold w-max block ">
            함께하고 싶은 성별
          </span>
          <RadioBtn
            option1="모두 포함"
            option2="동일 성별"
            name="sex"
            onChange={handleInputChange}
          />
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-1">
            함께하고 싶은 나이대
          </span>
          <div className="flex flex-col items-center flex-grow-1">
            <input
              type="number"
              placeholder="최소 나이"
              className="input input-bordered input-info w-full max-w-xs mb-1"
              min={20}
              max={100}
              required
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="최대 나이"
              className="input input-bordered input-info w-full max-w-xs "
              min={20}
              max={100}
              required
              onChange={handleInputChange}
            />
          </div>
        </section>

        <section className="mb-6">
          <span className="text-xl w-full text-left font-semibold block mb-2">
            모집 인원(본인포함) : {recruitedPeople} 명
          </span>
          <input
            type="range"
            min="2"
            max="10"
            step="1"
            value={recruitedPeople}
            onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          ))}
        </section>

        <section className="mb-32">
          <label className="text-xl w-full text-left font-semibold block mb-2">
            제목/내용을 입력하세요
          </label>
          <input
            type="text"
            placeholder="제목 (최대 30자)"
            className="input input-bordered input-info w-full max-w-full mb-1"
            required
            maxLength="30"
            onChange={handleInputChange}
          />
          <EditorQuill />
        </section>

        <button type="submit" className="btn btn-outline btn-info w-full mb-20">
          등록하기
        </button>
      </form>
    </main>
  );
};

export default CreatePost;

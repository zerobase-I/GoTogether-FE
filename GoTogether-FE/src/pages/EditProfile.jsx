import React from 'react';

const EditProfile = () => {
  return (
    <main className="mt-20">
      <h2 className="text-3xl mb-10">나의 정보 수정</h2>
      <form action="">
        <label className="">
          사진을 변경 하세요
          <input
            type="file"
            className="file-input file-input-bordered file-input-info w-full max-w-xs mt-1"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2 mt-6">
          닉네임변경
          <input type="text" className="grow" placeholder="코코" />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          현위치 주소
          <input type="text" className="grow" placeholder="abcd@site.com" />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-2">
          자기소개
          <input type="text" className="grow" placeholder="입력" />
          <span className="badge badge-info">Optional</span>
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-2">
          instagramID
          <input type="text" className="grow" placeholder="입력" />
          <span className="badge badge-info">Optional</span>
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-2">
          비밀번호변경
          <input type="password" className="grow" placeholder="입력" />
          <span className="badge badge-info">Optional</span>
        </label>

        <select className="select select-bordered w-full max-w-xs">
          <option disabled>나의 MBTI를 골라주세요</option>
          <option>ISTJ</option>
          <option>INFJ</option>
          <option>ENTP</option>
          <option>ENFP</option>
        </select>

        <button
          type="submit"
          className="btn btn-outline btn-info w-full mb-20 mt-10"
        >
          수정하기
        </button>
      </form>
    </main>
  );
};

export default EditProfile;

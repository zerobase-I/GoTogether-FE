import React from 'react';

const PostList = () => {
  return (
    <article className="mx-7">
      <div className="card bg-base-100 shadow-xl mx-1">
        <figure className="h-50 w-full">
          <img src="https://via.placeholder.com/300" alt="샘플이미지" />
        </figure>

        <div className="card-body">
          <h2 className="card-title flex flex-col">
            (title)같이 부산 맛집 뿌실분 구합니다
            <div className="badge badge-secondary">NEW</div>
            <span className="badge badge-outline">맛집/탐방</span>
            <span className="badge badge-outline">여행</span>
          </h2>
          <section>
            <div className="text-start text-lg">동행인원</div>
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
            <p className="test-sm">한국: 부산</p>
            <p className="test-sm">03.8 ~ 03.15</p>
            <p className="test-sm">현재인원/모집인원: 2/6</p>
            <p className="test-sm">모든 성별 , 모든 나이</p>
            <p className="test-sm">맛집/ 카페</p>
            <p className="test-sm">예상 금액</p>
          </div>
          <div className="border-t mt-10">
            <span className="mt-10">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
              aperiam, porro fugiat suscipit voluptate iusto voluptates cum,
              unde quibusdam libero expedita eligendi beatae. Recusandae debitis
              quae rem ipsam doloribus vel? Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Minima aperiam, porro fugiat
              suscipit voluptate iusto voluptates cum, unde quibusdam libero
              expedita eligendi beatae. Recusandae debitis quae rem ipsam
              consectetur adipisicing elit. Minima aperiam, porro fugiat
              suscipit voluptate iusto voluptates cum, unde quibusdam libero
              expedita eligendi beatae. Recusandae debitis quae rem ipsam
              consectetur adipisicing elit. Minima aperiam, porro fugiat
              suscipit voluptate iusto voluptates cum, unde quibusdam libero
              expedita eligendi beatae. Recusandae debitis quae rem ipsam
            </span>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-outline btn-info w-full mb-20">
        동행 요청
      </button>
    </article>
  );
};

export default PostList;

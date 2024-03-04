import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = () => {
  return (
    <section className=" mb-4 mt-8  shadow-lg shadow-blue-500/30 rounded-md">
      <Link to="/home/postlist">
        <div className="flex flex-col">
          <div className="flex ">
            <img src="https://via.placeholder.com/100" alt="샘플이미지" />
            <div className="flex flex-col items-start justify-between">
              <div>
                <h3 className="text-base md:text-2xl ml-4 mt-4 font-semibold">
                  (title)같이 부산 맛집 뿌실분 구합니다
                </h3>
              </div>
              <span className="text-sm md:text-base ml-4 mt-4 ">
                03.8 ~ 03.15 (start date / endDate)
              </span>
              <span className="ml-4 mb-2 font-light text-xs md:text-sm inline-block  max-h-9  text-left line-clamp-3  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                voluptates aspernatur distinctio voluptatum ab nulla aliquid.
                Molestias odio asperiores quibusdam nostrum quae, tempore
                doloribus rem quas cum repudiandae, nisi eum?
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default PostItem;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostItem = ({
  post,
  post: { title, startDate, finishDate, content, id, image },
}) => {
  const navigate = useNavigate();

  return (
    <section
      className=" mb-4 mt-8  shadow-lg shadow-blue-500/30 rounded-md"
      onClick={() => navigate(`/home/postlists/${id}`, { state: { post } })}
    >
      <div className="flex flex-col">
        <div className="flex ">
          <img src="https://via.placeholder.com/100" alt="샘플이미지" />
          <div className="flex flex-col items-start justify-between">
            <div>
              <h3 className="text-base md:text-2xl ml-4 mt-4 font-semibold">
                {title}
              </h3>
            </div>
            <span className="text-sm md:text-base ml-4 mt-4 ">
              {startDate} ~ {finishDate}
            </span>
            <span className="ml-4 mb-2 font-light text-xs md:text-sm inline-block  max-h-9  text-left line-clamp-3  ">
              {content}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostItem;

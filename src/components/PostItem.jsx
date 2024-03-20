import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiCommercialAirplane } from 'react-icons/gi';
import { MdCalendarMonth } from 'react-icons/md';

const PostItem = ({
  post,
  post: {
    title,
    startDate,
    endDate,
    content,
    id,
    image,
    travelCity,
    travelCountry,
  },
}) => {
  const navigate = useNavigate();

  return (
    <section
      className=" mb-4 mt-8  shadow-lg shadow-blue-500/30 rounded-md cursor-pointer"
      onClick={() => navigate(`/postlists/${id}`, { state: { post } })}
    >
      <div className="flex flex-col py-3">
        <div className="flex ">
          <img
            src={image && image[0] && `${image[0].imageId}`}
            alt="샘플이미지"
            width="100px"
          />
          <div className="flex flex-col items-start justify-between">
            <div>
              <h3 className="text-base md:text-2xl ml-4 mt-2 font-bold">
                {title}
              </h3>
            </div>
            <span className="text-sm md:text-base ml-4 mt-2 flex">
              <MdCalendarMonth />
              {moment(startDate).format('YYYY-MM-DD')} ~{' '}
              {moment(endDate).format('YYYY-MM-DD')}
            </span>
            <div className="flex text-xs my-1">
              <GiCommercialAirplane className="ml-4" />
              {travelCity}({travelCountry})
            </div>
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

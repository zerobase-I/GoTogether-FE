import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiCommercialAirplane } from 'react-icons/gi';
import { MdCalendarMonth } from 'react-icons/md';
import { sampleImage } from './config/sampleImg';

const PostItem = ({
  post,
  post: {
    title,
    startDate,
    endDate,
    content,
    id,
    imagesUrl,
    travelCity,
    travelCountry,
  },
}) => {
  const navigate = useNavigate();

  // console.log(post);

  return (
    <section
      className="mb-4 mt-8 shadow transition duration-200 ease-in-out transform hover:shadow-md rounded-lg cursor-pointer"
      onClick={() => navigate(`/postlists/${id}`, { state: { post } })}
    >
      <div className="flex flex-col pt-3 rounded-2xl">
        <div className="flex ">
          <img
            className="w-24 md:w-40 h-40"
            src={(imagesUrl && imagesUrl[0]) || sampleImage}
            alt="샘플이미지"
            height="100"
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
          <p className="ml-4 mt-2 text-sm max-h-24 overflow-hidden text-ellipsis">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PostItem;

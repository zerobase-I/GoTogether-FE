import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiCommercialAirplane } from 'react-icons/gi';
import { MdCalendarMonth } from 'react-icons/md';
import { sampleImage } from './config/sampleImg';

const PostItem = ({
  post,
  post: {
    postCategory,
    category,
    postGenderType,
    gender,
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
      className="pt-2 overflow-hidden mb-4 mt-4 ss:mt-6 shadow transition duration-200 ease-in-out transform hover:shadow-md rounded-lg cursor-pointer"
      onClick={() => navigate(`/postlists/${id}`, { state: { post } })}
    >
      <div className="flex   rounded-b-2xl">
        <div className="flex">
          <div className=" w-40 h-32 md:w-60 md:h-full overflow-hidden">
            <img
              className="w-44 h-full md:w-60 md:h-40  object-cover rounded-2xl "
              src={(imagesUrl && imagesUrl[0]) || sampleImage}
              alt="여행사진"
            />
          </div>

          <div className="flex flex-col items-start justify-between   mr-1 ">
            <div className="flex w-full flex-col md:flex-row-reverse justify-end ">
              <div className="flex text-sm mt-1">
                <span className="badge badge-secondary mr-1 text-xs ml-1 ">
                  {gender || postGenderType}
                </span>
                <span className="badge badge-primary text-xs">
                  {category || postCategory}
                </span>
              </div>
              <div className="w-6/12 ss:w-fit">
                <h3 className=" text-start  text-base md:text-2xl ml-4 mt-1 font-extrabold whitespace-nowrap overflow-hidden  text-ellipsis">
                  {title}
                </h3>
              </div>
            </div>

            <span className="text-sm md:text-base ml-4 mt-1 flex w-full">
              <MdCalendarMonth className="mr-1" />
              {moment(startDate).format('YYYY-MM-DD')} ~{' '}
              {moment(endDate).format('YYYY-MM-DD')}
            </span>

            <div className="flex text-xs text-gray-500">
              <GiCommercialAirplane className="ml-4 mr-1" />
              {travelCity}({travelCountry})
            </div>

            <div className="w-screen">
              <span className="mt-0 ml-4 mb-2 w-5/12 ss:w-7/12 md:w-5/12 block  text-left  text-gray-400 text-xs md:text-sm  max-h-9  whitespace-nowrap overflow-hidden  text-ellipsis">
                {content}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostItem;

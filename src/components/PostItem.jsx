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
      className="mb-4 mt-8 shadow transition duration-200 ease-in-out transform hover:shadow-md rounded-lg cursor-pointer"
      onClick={() => navigate(`/postlists/${id}`, { state: { post } })}
    >
      <div className="flex py-3 shadow-lg">
        <img
          src={image && image[0] ? `${image[0].imageId}` : 'path/to/your/default-image.jpg'}
          alt="Post"
          className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-md m-4"
        />
        <div className="flex flex-col justify-between">
          <h3 className="text-lg md:text-xl font-semibold ml-4 mt-2">{title}</h3>
          <span className="text-sm ml-4 mt-2 flex items-center">
            <MdCalendarMonth className="text-lg mr-2" />
            {moment(startDate).format('YYYY-MM-DD')} ~ {moment(endDate).format('YYYY-MM-DD')}
          </span>
          <div className="flex items-center text-sm ml-4 mt-2">
            <GiCommercialAirplane className="text-lg mr-2" />
            {travelCity}, {travelCountry}
          </div>
          <p className="ml-4 mt-2 text-sm max-h-24 overflow-hidden text-ellipsis">{content}</p>
        </div>
      </div>
    </section>
  );
};

export default PostItem;

import { Link } from 'react-router-dom';

const AlarmBox = () => {
  return (
    <section className=" mb-4 mt-8 mx-4  shadow-lg shadow-blue-500/30 rounded-md ">
      <Link to="/home/review">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <img
              src="https://via.placeholder.com/100"
              alt="샘플이미지"
              className="basis-1/12"
            />
            <div className="flex flex-col items-start justify-around basis-10/12 ">
              <div>
                <h3 className="text-sm mt-4 mb-2 md:text-2xl ml-4  font-semibold">
                  관리자
                </h3>
              </div>
              <div className="ml-4 mb-4 font-light text-xs md:text-sm inline-block    text-left line-clamp-3  ">
                <span>친구들과 같이 여행을 재밌게 즐기고 오셨나요?😀 </span>
                <br />
                <span>친구들의 후기를 남겨보세요.✔ </span>
              </div>
            </div>
            <div className="text-xs  mt-2 mr-2 justify-items-end w-1/4  ss:basis-2/12 md:text-sm">
              12:00 PM
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default AlarmBox;

import React from 'react';
import Spinner from '../assets/loadingSpinner.gif';

const Loading = () => {
  return (
    <section className="flex justify-center flex-col items-center h-60">
      <img src={Spinner} alt="로딩중" width="5%" />
      <span>로딩중...</span>
    </section>
  );
};

export default Loading;

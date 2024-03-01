import React from 'react';

const Modal = () => {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_1').showModal()}
      >
        모달창 열기
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">안녕하세요!</h3>
          <p className="py-4">본인 인증시 인증마크가 부여됩니다.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">확인</button>
              <button className="btn">취소</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;

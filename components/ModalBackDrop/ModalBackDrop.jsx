"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ModalBackDrop = ({ imageUrl, title }) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const router = useRouter();

  const closeModal = () => {
    setModalOpen(false);
    router.back();
  };

  return (
    <>
      {isModalOpen && (
        <>
          <div className="modal-backdrop" onClick={closeModal} />
          <dialog className="modal" open>
            <div className="x-elem">
              <img src={imageUrl} alt={title} />
              <div className="X" onClick={closeModal}>
                X
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
};

export default ModalBackDrop;

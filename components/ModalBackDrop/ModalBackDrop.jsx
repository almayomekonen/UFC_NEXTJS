"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ModalBackDrop = () => {
  const router = useRouter();

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
    </>
  );
};

export default ModalBackDrop;

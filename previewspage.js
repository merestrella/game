import React from "react";
import Link from "next/link";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  weight: "500",
  subsets: ["latin"],
});
const PreviewPage = () => {
  return (
  <>
    <div className="container-preview">
      <Link href="/juego" className={`btn-start ${rubik.className}`}>
        Comenzar partida
      </Link>
    </div>
  </>
    
  );
};

export default PreviewPage;
import React from "react";
import { useFetchData } from "../useFetchData";
import { AppDispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { getPredictions } from "../../redux/actions/image-action";

const Images = () => {
  const images = useSelector((state: RootState) => state.image.images);
  const renderImages = () => {
    return images.map((image) => {
      return (
        <li className="images-item">
          <img src={image} alt="" />
        </li>
      );
    });
  };
  return (
    <>
      {images.length !== 0 && (
        <div className="images">
          <p className="images-header">Predictions</p>
          <div className="images-wrapper">
            <ul className="images-list">{renderImages()}</ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Images;

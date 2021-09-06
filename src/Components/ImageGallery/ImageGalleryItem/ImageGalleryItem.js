import React from "react";
import PropTypes from 'prop-types'
import style from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, largeImage, onClickImage }) => (
    <li
        className={style.ImageGalleryItem}
        onClick={() => onClickImage(largeImage)}
    >
        <img src={webformatURL} alt="" className={style.ImageGalleryItem_image} />
    </li>
);

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    onClickImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
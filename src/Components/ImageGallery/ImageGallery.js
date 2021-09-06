import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types'
import style from './ImageGallery.module.css'

const ImageGallery = ({ images, onClickImage }) => (
    <ul className={style.ImageGallery}>
        {images.map(({ webformatURL, largeImageURL, id }) => (
            <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                onClickImage={onClickImage}
                largeImage={largeImageURL}
            />
        ))}
    </ul>
);

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
    onClickImage: PropTypes.func.isRequired,
};

export default ImageGallery;
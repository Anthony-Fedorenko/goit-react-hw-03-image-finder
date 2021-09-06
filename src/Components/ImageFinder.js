import React, {Component} from "react";
import Container from "./Container/Container";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import Error from "./Error/Error";

import fetchImg from "../Api/Api";

const PAGESIZE = 12;

class ImageFinder extends Component {
    state = {
        images: [],
        totalHits: 0,
        searchQuery: '',
        currentPage: 1,
        error: null,
        isLoading: false,
        largeImage: '',
        message: '',
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.fetchApi();
        }
        if (snapshot && this.state.currentPage > 2) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return prevState.images.length < this.state.images.length;

    }

    handleChangeQuery = query => {

        this.setState({
            searchQuery: query,
            images: [],
            totalHits: 0,
            currentPage: 1,
            error: null,
            isLoading: false,
            showModal: false,
        });
    };


    handleClickButton = () => {
        this.fetchApi();
    };

    handleClickImage = imageItem => {
        this.setState({
            showModal: true,
            largeImage: imageItem,
        });
    };

    closeModal = () => {
        this.setState(prevState => ({
            largeImage: '',
            showModal: !prevState.showModal,
        }));
    };

    fetchApi() {
        const {currentPage, searchQuery} = this.state;
        const options = {currentPage, searchQuery};
        this.setState({isLoading: true});

        fetchImg(options)
            .then(({hits, totalHits}) => {
                this.setState({totalHits: totalHits});
                this.setState(prevState => ({
                    images: [...prevState.images, ...hits],
                    currentPage: prevState.currentPage + 1,
                }));
            })
            .catch(error => this.setState({error}))
            .finally(() => this.setState({isLoading: false}));
    }

    render() {
        const {
            images,
            isLoading,
            totalHits,
            error,
            showModal,
            largeImage,
            searchQuery,
        } = this.state;
        const showButton = totalHits > PAGESIZE;

        return (
            <Container>
                <Searchbar onSubmit={this.handleChangeQuery}/>
                {(error && (
                    <Error
                        text={'Smth went wrong, try again'}
                    />
                )) ||
                (totalHits === 0 && searchQuery && !isLoading && (
                    <Error
                        text={'False, please try again'}
                    />
                ))}

                <ImageGallery
                    images={images}
                    onClickImage={this.handleClickImage}
                />
                {isLoading && <Loader/>}
                {showButton && <Button onClick={this.handleClickButton}/>}
                {showModal && (
                    <Modal onClose={this.closeModal} largeImage={largeImage}/>
                )}
            </Container>
        );
    }
}

export default ImageFinder;


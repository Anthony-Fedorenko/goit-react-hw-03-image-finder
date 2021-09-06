import React from "react";
import PropTypes from 'prop-types'
import style from './Error.module.css'

const Error = ({ text }) => <h2 className={style.error}>{text}</h2>;

Error.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Error;
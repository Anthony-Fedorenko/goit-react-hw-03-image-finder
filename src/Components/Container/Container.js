import React from "react";
import PropTypes from 'prop-types'
import style from './Container.module.css'

const Container = ({ children}) => (
    <div className={style.container}>{children}</div>
);

Container.prototype = {
    children: PropTypes.node.isRequired,
};

export default Container
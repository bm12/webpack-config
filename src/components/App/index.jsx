import React from 'react';

import PropTypes from 'prop-types';

import Description from '../Description';

import classNames from 'classnames/bind';
import styles from './styles.css';
const cx = classNames.bind(styles);

const App = ({ name }) => (
  <div className={cx('wrapper')}>
    {name} say: Hello!

    <Description />
  </div>
);

App.defaultProps = {
  name: 'React',
};

App.propTypes = {
  name: PropTypes.string,
};

export default App;

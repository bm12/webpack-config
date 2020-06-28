import React from 'react';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const Description = () => (
  <div className={cx('description')}>
    Webpack
    <span className={cx('icon')}>
      <span dangerouslySetInnerHTML={{ __html: '&starf;' }} />
    </span>
  </div>
);

export default Description;

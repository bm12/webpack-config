import React from 'react';
import ReactDom from 'react-dom';

import { log } from '@/utils/log';
import { sleep } from './utils/sleep';
import App from '@/components/App';

import catImg from './assets/cat.jpg';
import './styles/styles.css';

log('Hello, world!');
log(catImg);

const asyncFunction = async () => {
  log('start');
  await sleep(2000);

  const someList = [1, 2, 3, 4];
  const isWork = someList.includes(Number.parseInt('4.53', 10));
  log({ isWork });
};

asyncFunction();

ReactDom.render(<App />, document.getElementById('app'));

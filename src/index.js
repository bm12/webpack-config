import { log } from '@/utils/log';
import './styles/styles.css';
import catImg from './assets/cat.jpg';
import { sleep } from './utils/sleep';

log('Hello, world!');
log(catImg);

const asyncFunction = async () => {
  log('start');
  await sleep(2000);

  const someList = [1, 2, 3, 4];
  const isWork = someList.includes(Number.parseInt('4.53'));
  log({ isWork });
};

asyncFunction();

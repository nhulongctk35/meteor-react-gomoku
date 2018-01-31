import { times } from 'lodash';
const SIZE = 19;

export function fakeBoardData() {
  const boardData = times(SIZE, (y) => {
    return times(SIZE, (x) => 'x');
  });

  return boardData;
}

import { all, call } from 'redux-saga/effects';
import { sidebar } from '../sidebar/saga';

function* rootSaga() {
    yield all([call(sidebar)]);
}

export default rootSaga;

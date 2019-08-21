import { createAction } from 'redux-actions';
import { SHOW_PACKAGE_INFO } from './actionTypes';

export const showPackageInfo = createAction(SHOW_PACKAGE_INFO, name => ({
    name
}));

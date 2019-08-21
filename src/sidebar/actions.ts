import { createAction } from 'redux-actions';
import { GET_PACKAGE_INFO, GET_PROJECT_INFO } from './actionTypes';

export const getPackageInfo = createAction(GET_PACKAGE_INFO, (name, version) => ({ name, version }));

export const getProjectInfo = createAction(GET_PROJECT_INFO, json => ({ json }));

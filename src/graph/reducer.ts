import { handleActions } from 'redux-actions';
import { SHOW_PACKAGE_INFO, MOUNT_PACKAGES, MOUNT_NODES, MOUNT_LOADED_COUNTER } from './actionTypes';
import { IState } from '../sidebar/types';

const initialState: IState = {
    graph: '',
    nodes: { nodes: [], edges: [] },
    selectedPack: {},
    loadedPackCount: 0
};

export const graph = handleActions(
    {
        [MOUNT_PACKAGES]: (state: IState, { payload }) => ({
            ...state,
            graph: payload
        }),
        [MOUNT_NODES]: (state: IState, { payload }): IState => ({
            ...state,
            nodes: payload,
            loadedPackCount: 0
        }),
        [SHOW_PACKAGE_INFO]: (state: IState, { payload }): IState => ({
            ...state,
            // @ts-ignore
            selectedPack: state.graph.get(payload.name)
        }),
        [MOUNT_LOADED_COUNTER]: (state: IState, { payload }): IState => ({
            ...state,
            loadedPackCount: payload
        })
    },
    initialState
);

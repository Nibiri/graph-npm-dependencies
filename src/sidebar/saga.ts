//@ts-ignore-file
import { call, takeLatest, put, all, delay } from 'redux-saga/effects';
import { GET_PACKAGE_INFO, GET_PROJECT_INFO } from './actionTypes';
import { MOUNT_PACKAGES, MOUNT_NODES, MOUNT_LOADED_COUNTER } from '../graph/actionTypes';
import getPackageInfo from '../providers';
import { wrapVersion, extractDependencies, separateStrucure, packageStackHolder } from './utils';
import { ISagaTmpNode, PackageControlT } from './types';

function* fethcDependencies(name: string, version: string) {
    try {
        const response = yield call(getPackageInfo, name, version);
        if (response.status === 404) {
            return yield call(getPackageInfo, name, 'latest');
        }
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

function* getDependenses(
    name: string,
    version: string,
    nodes: Map<string, ISagaTmpNode>,
    packageControl: PackageControlT<[string, string, number]>,
    level = 0
) {
    const rootNameAndVersion = wrapVersion({ name, version });
    try {
        const child = yield fethcDependencies(rootNameAndVersion.name, rootNameAndVersion.version);
        const dependencies = extractDependencies(child);
        nodes.set(`${rootNameAndVersion.name}@${rootNameAndVersion.version}`, { version, dependencies, level, child });
        if (dependencies) {
            dependencies.forEach(([depName, depVersion]) => {
                const { name, version } = wrapVersion({ name: depName, version: depVersion });
                if (!nodes.has(`${name}@${version}`)) {
                    // @ts-ignore
                    packageControl.put([name, version, level + 1]);
                }
            });
        }
        packageControl.queryFinished();
    } catch (error) {
        console.log(error);
    }
}

function* getPackage({ payload }) {
    const nodes = new Map<string, ISagaTmpNode>();
    const packageControl = packageStackHolder<[string, string, number]>();
    const { name, version } = wrapVersion(payload);
    //@ts-ignore
    packageControl.put([name, version, 0]);
    let currentQueries: any = [];
    try {
        while (packageControl.nonEmpty || packageControl.inProgress > 0) {
            if (packageControl.inProgress < 50 && packageControl.nonEmpty) {
                const [n, v, l] = packageControl.extract();
                // @ts-ignore
                currentQueries.push(getDependenses(n, v, nodes, packageControl, l));
            } else {
                yield all(currentQueries);
                yield put({ type: MOUNT_LOADED_COUNTER, payload: packageControl.totalLoaded });
                currentQueries = [];
                yield delay(300);
            }
        }
        yield put({ type: MOUNT_NODES, payload: separateStrucure(nodes) });
        yield put({ type: MOUNT_PACKAGES, payload: nodes });
    } catch (error) {
        console.log(error);
    }
}

function* getProjectInfo({ payload }) {
    const packageControl = packageStackHolder<[string, string, number]>();
    const { json } = payload;
    const { name, version } = wrapVersion(json);
    const level = 0;
    const nodes = new Map<string, ISagaTmpNode>();
    const dependencies = extractDependencies(json);
    nodes.set(`${name}@${version}`, { version, dependencies, level });
    dependencies.forEach(([depName, depVersion]: [string, string]) => {
        const { name, version } = wrapVersion({ name: depName, version: depVersion });
        packageControl.put([name, version, 0]);
    });

    let currentQueries: any = [];
    try {
        while (packageControl.nonEmpty || packageControl.inProgress > 0) {
            if (packageControl.inProgress < 100 && packageControl.nonEmpty) {
                const [n, v, l] = packageControl.extract();
                // @ts-ignore
                currentQueries.push(getDependenses(n, v, nodes, packageControl, l + 1));
            } else {
                yield all(currentQueries);
                yield put({ type: MOUNT_LOADED_COUNTER, payload: packageControl.totalLoaded });
                currentQueries = [];
                yield delay(30);
            }
        }
        yield put({ type: MOUNT_NODES, payload: separateStrucure(nodes) });
        yield put({ type: MOUNT_PACKAGES, payload: nodes });
    } catch (error) {
        console.log(error);
    }
}
export function* sidebar() {
    // @ts-ignore
    yield takeLatest(GET_PACKAGE_INFO, getPackage);
    // @ts-ignore
    yield takeLatest(GET_PROJECT_INFO, getProjectInfo);
}

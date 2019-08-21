import { head, tail, compose, has, trim } from 'ramda';
import { INode, WrapVersionT, IPackageJSON, NameVersionTupleT, ISagaTmpNode, PackageControlT } from './types';
import { VERTICAL_OFFSET, HORIZONTAL_ANCHOR, NEGATIVE_OFFSET, BASIC_SIZE } from './constants';

export const packageStackHolder = <T>(): PackageControlT<T> => {
    const stack: Set<T> = new Set<T>();
    let progress = 0;
    let loadedCounter = 0;

    const accessController: PackageControlT<T> = {
        extract: () => {
            progress += 1;
            const last = Array.from(stack).pop() as T;
            stack.delete(last);
            return last;
        },
        put: v => {
            stack.add(v);
        },
        queryFinished: () => {
            progress -= 1;
            loadedCounter += 1;
        },
        get size() {
            return stack.size;
        },
        get nonEmpty() {
            return !!stack.size;
        },
        get isEmpty() {
            return stack.size ? false : true;
        },
        get inProgress() {
            return progress;
        },
        get totalLoaded() {
            return loadedCounter;
        }
    };

    return accessController;
};

const removeVersionSpecialSymbols: WrapVersionT = ({ name, version }) => {
    const splited = head(version.split('||'));
    const versionHead = head(splited);
    const handledVersion = versionHead === '^' || versionHead === '~' || versionHead === '=' ? tail(splited) : splited;
    return { name, version: trim(handledVersion) };
};

const normalizeVersion: WrapVersionT = ({ name, version }) => {
    if (version.includes('>=') || version.includes('x') || version.includes('*')) {
        return { name, version: 'latest' };
    }
    if (version.length === 3) {
        return { name, version: `${version}.0` };
    }
    if (version.length === 1) {
        return { name, version: `${version}.0.0` };
    }
    return { name, version };
};

const handleMacro: WrapVersionT = ({ version, name }) => {
    const isMacro = name.includes('@');
    return isMacro ? { name, version: '' } : { name, version };
};

export const wrapVersion: WrapVersionT = compose(
    handleMacro,
    normalizeVersion,
    removeVersionSpecialSymbols
);

export const extractDependencies = (child: IPackageJSON): NameVersionTupleT[] =>
    child && has('dependencies', child) && child.dependencies ? Object.entries(child.dependencies) : [];

const yOffset = new Map([[0, 0]]);

const handleOffset = (level: number, size: number) => {
    if (yOffset.has(level)) {
        const currentOffset = yOffset.get(level) as number;
        yOffset.set(level, currentOffset + VERTICAL_OFFSET + size);
        return currentOffset + VERTICAL_OFFSET + size;
    }
    yOffset.set(level, NEGATIVE_OFFSET);
    return NEGATIVE_OFFSET;
};

const colorPalette = [
    '#dd6b66',
    '#759aa0',
    '#e69d87',
    '#8dc1a9',
    '#ea7e53',
    '#eedd78',
    '#73a373',
    '#73b9bc',
    '#7289ab',
    '#91ca8c',
    '#f49f42',
    '#dd6b66',
    '#759aa0'
];

const choseSize = dependencies => {
    const { length } = dependencies;
    return length > 2 ? length * 2 : BASIC_SIZE;
};

export const separateStrucure = (nodes: Map<string, ISagaTmpNode>) => {
    const edges = new Map();
    const nodesGr: INode[] = [];

    nodes.forEach((value, key) => {
        const { level, dependencies } = value;
        nodesGr.push({
            attributes: {},
            color: colorPalette[level],
            id: key,
            name: key,
            symbolSize: choseSize(dependencies),
            x: HORIZONTAL_ANCHOR * level + choseSize(dependencies),
            y: handleOffset(level, choseSize(dependencies))
        });
        value.dependencies.forEach(([pack, version]) => {
            edges.set(`${key}>${pack}@${version}`, {
                source: key,
                target: `${pack}@${wrapVersion({ name: pack, version }).version}`
            });
        });
    });

    return {
        edges: Array.from(edges.values()),
        nodes: nodesGr
    };
};

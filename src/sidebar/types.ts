import isEmpty from 'ramda/es/isEmpty';

export interface INode {
    attributes: Object;
    color: string;
    id: string | number;
    name: string;
    symbolSize: number;
    x: number;
    y: number;
}

export interface IEdge {
    source: string;
    target: string;
}

export interface IPackageJSON extends Object {
    readonly name: string;

    readonly version?: string;

    readonly description?: string;

    readonly keywords?: string[];

    readonly license?: string;

    readonly author?: string | IAuthor;

    readonly contributors?: string[] | IAuthor[];

    readonly files?: string[];

    readonly main?: string;

    readonly dependencies?: IDependencyMap;

    readonly devDependencies?: IDependencyMap;

    readonly peerDependencies?: IDependencyMap;

    readonly optionalDependencies?: IDependencyMap;

    readonly bundledDependencies?: string[];
}

interface IAuthor {
    name: string;
    email?: string;
    homepage?: string;
}

export interface IDependencyMap {
    [dependencyName: string]: string;
}

export type NameVersionTupleT = [string, string];

export interface IState {
    graph: any;
    nodes: { nodes: INode[]; edges: IEdge[] };
    selectedPack: {} | null;
    loadedPackCount: number;
}

export interface ISagaTmpNode {
    version: string;
    dependencies: NameVersionTupleT[];
    level: number;
    child?: IPackageJSON;
}

interface INameAndVersion {
    version: string;
    name: string;
}

export type WrapVersionT = (nameAndVersion: INameAndVersion) => INameAndVersion;

export type PackageControlT<T> = {
    extract: () => T | undefined;
    put: (v: T) => void;
    queryFinished: () => void;
    readonly size: number;
    readonly inProgress: number;
    readonly isEmpty: boolean;
    readonly nonEmpty: boolean;
    readonly totalLoaded: number;
};

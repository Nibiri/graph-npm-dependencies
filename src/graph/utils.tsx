import { IEdge, INode } from '../sidebar/types';

const renderNodes = (nodes: INode[]) =>
    nodes.map(({ x, y, id, name, symbolSize, color }) => ({
        x,
        y,
        id,
        name,
        symbolSize,
        itemStyle: { normal: { color: color } }
    }));

const renderEdges = (edges: IEdge[]) => edges.map(({ source, target }) => ({ source, target }));

const lineStyleSettings = {
    width: 0.5,
    curveness: 0.3,
    opacity: 0.7
};

const labelSettings = {
    position: 'right',
    show: true
};

const сonfigOptions = ({ nodes, edges }) => ({
    title: {
        text: 'NPM Dependencies'
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'none',
            data: renderNodes(nodes),
            edges: renderEdges(edges),
            label: {
                emphasis: labelSettings
            },
            roam: true,
            focusNodeAdjacency: true,
            lineStyle: {
                normal: lineStyleSettings
            }
        }
    ]
});

export default сonfigOptions;

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import echarts from 'echarts';
import { showPackageInfo } from './actions';
import configOptions from './utils';

const Wrapper = styled.div`
    flex-grow: 1;
    height: 100%;
`;

const Loader = styled.div`
    position: absolute;
    top: 50%;
    left: 40%;
    font-size: 32px;
    z-index: 2;
`;

const Graph = ({ rawNodes, showPackageInfo, loadedPackCount }) => {
    const [chart, setChart] = useState();
    // Did mount
    useEffect(() => {
        // As far as we know that main is div.
        const targetElement = document.getElementById('main') as HTMLDivElement | null;
        if (targetElement) {
            setChart(echarts.init(targetElement, 'dark'));
        }
    }, []);

    // Fires chart configuration on finishing init and changing nodeset
    useEffect(() => {
        rawNodes && chart && chart.setOption(configOptions(rawNodes), true);
    }, [rawNodes, chart]);

    // Starting graph rendering when all the presetup done.
    useEffect(() => {
        if (chart) {
            chart.hideLoading();
            chart.on('click', 'series', function({ name }) {
                showPackageInfo(name);
            });
        }
    }, [chart, showPackageInfo]);
    return (
        <Wrapper>
            {loadedPackCount > 0 ? <Loader>{`Loading  pacages(${loadedPackCount} packs)...`}</Loader> : null}
            <div id="main" style={{ width: '100%', height: '100vh' }}></div>
        </Wrapper>
    );
};

const mapStateToProps = state => ({
    rawNodes: state.graph.nodes,
    loadedPackCount: state.graph.loadedPackCount
});

export default connect(
    mapStateToProps,
    { showPackageInfo }
)(Graph);

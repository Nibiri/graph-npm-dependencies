import React, { SFC } from 'react';
import { pick, has } from 'ramda';
import { connect } from 'react-redux';
import { Info } from './styles';

interface IProps {
    info: any;
}

const dropKeys = pack =>
    pick(['name', 'version', 'description', 'repository', 'license', 'author', 'dependencies', 'homepage'], pack);

const PackageInfo: SFC<IProps> = ({ info }) => {
    return <Info>{has('child', info) && JSON.stringify(dropKeys(info.child), null, 2)}</Info>;
};

const mapStateToProps = state => ({
    info: state.graph.selectedPack
});

export default connect(
    mapStateToProps,
    null
)(PackageInfo);

import React, { useState, SFC, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import PackageInfo from './PackageInfo';
import { getPackageInfo, getProjectInfo } from './actions';
import {
    Wrapper,
    InputWrapper,
    InputPackageName,
    InputVersion,
    Button,
    WrappedInput,
    InputFile,
    ChooseFileBtn,
    Label,
    Info
} from './styles';

interface IProps {
    getPackageInfo: (name: any, version: any) => void;
    getProjectInfo: (json: any) => void;
}

const fr = new FileReader();

const Sidebar: SFC<IProps> = ({ getPackageInfo, getProjectInfo }) => {
    const [packageName, setPackageName] = useState('');
    const [fileName, setFileName] = useState('');
    const [version, setVersion] = useState('');

    const handleFileChange = (files: FileList | null) => {
        files && files[0] && fr.readAsText(files[0]);
        //@ts-ignore
        setFileName(files[0].name);
        fr.onload = () => {
            // Usage of FileReader instance result is recommended
            // for non type loose.
            const { result } = fr;
            // Prooving that type of parsed result is string coz it could be
            // string | ArrayBuffer | null
            if (typeof result === 'string') {
                getProjectInfo(JSON.parse(result));
            } else {
                // @TODO: Implement default exception handling
                // Inconsistent file type.
            }
        };
    };
    const handleSubmit = () => {
        getPackageInfo(packageName, version || 'latest');
    };

    return (
        <Wrapper>
            <InputWrapper>
                <InputPackageName
                    type="text"
                    value={packageName}
                    placeholder="Package name"
                    onChange={input => setPackageName(input.currentTarget.value)}
                />
                <InputVersion
                    type="text"
                    value={version}
                    placeholder="version (optional)"
                    onChange={input => setVersion(input.currentTarget.value)}
                />

                <Button type="button" onClick={handleSubmit}>
                    Search
                </Button>
            </InputWrapper>
            OR
            <WrappedInput>
                <InputFile
                    type="file"
                    onChange={(e: SyntheticEvent<HTMLInputElement>) => {
                        handleFileChange(e.currentTarget.files);
                    }}
                />
                <ChooseFileBtn>Choose</ChooseFileBtn>
                <Label data-js-label>{fileName ? fileName : 'No file selected'}</Label>
            </WrappedInput>
            <PackageInfo />
        </Wrapper>
    );
};

export default connect(
    null,
    { getPackageInfo, getProjectInfo }
)(Sidebar);

import styled from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    top: 70px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    background: #444;
    padding: 10px;
    border-radius: 4px;
`;

export const InputWrapper = styled.div`
    width: 100%;
    max-width: 900px;
    display: flex;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 15px;
    outline: none;
    border: 1px solid #ccc;
`;

export const InputPackageName = styled(Input)`
    width: 180px;
    border-radius: 4px 0px 0px 4px;
`;

export const InputVersion = styled(Input)`
    width: 130px;
`;

export const Button = styled.button`
    padding: 10px;
    font-size: 15px;
    width: 80px;
    outline: none;
    border: none;
    background-color: #72a372a1;
    color: #fff;
    cursor: pointer;
    border-radius: 0px 4px 4px 0px;
    &:hover {
        background-color: #72a372;
    }
`;

export const WrappedInput = styled.div`
    display: inline-block;
    text-align: left;
    background: #fff;
    padding: 16px;
    position: relative;
    border-radius: 3px;
`;

export const InputFile = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
    cursor: pointer;
`;

export const ChooseFileBtn = styled.span`
    display: inline-block;
    cursor: pointer;
    background: #608061;
    padding: 8px 16px;
    border-radius: 2px;
    margin-right: 8px;
    color: white;
    &:hover {
        background-color: #72a372;
    }
`;
export const Label = styled.span`
    color: #333;
    white-space: nowrap;
`;

export const Info = styled.pre`
    background: #333333;
    padding: 15px;
    border-radius: 4px;
`;

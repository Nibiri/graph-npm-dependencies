import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://registry.npmjs.cf'
});

const getPackageInfo = (packageName, version) =>
    instance
        .get(`/${packageName}/${version}`)
        .then(response => response)
        .catch(error => error.response);

export default getPackageInfo;

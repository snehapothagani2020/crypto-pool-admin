/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */
import axios from "axios";
import {CREATE, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, HttpError} from "react-admin";
import setAuthToken from "../helpers/setAuthToken";

const convertDataProviderRequestToHTTP = (type, resource, params) => {
    const options = {};

    switch (type) {
        case GET_LIST:
            return {url: `${resource}/`};

        case GET_ONE:
            return {url: `${resource}/${params.id}`};

        case CREATE:
            options.method = 'POST';
            options.body = params.data;
            return {url: `${resource}/create/`, options};

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }
};

const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    switch (type) {
        case GET_MANY_REFERENCE:
        case GET_MANY:
        case GET_LIST: {
            return {
                data: response.data.data.map(value => Object.assign({
                        id: value._id
                    },
                    value)),
                total: Object.keys(response.data).length,
            };
        }

        case GET_ONE:
            return {
                data: Object.assign({id: response.data.data._id}, response.data.data)
            };

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }
};

export default (type, resource, params) => {
    setAuthToken(sessionStorage.getItem("token"));
    const {url, options} = convertDataProviderRequestToHTTP(type, resource, params);
    const {method, body} = options;

    return axios({url: url, method: method, data: body})
        .then((response) => convertHTTPResponseToDataProvider(response, type, resource, params))
        .catch(error => {
            throw new HttpError(error.response.statusText, error.response.status, error.response.data.errors)
        })
};
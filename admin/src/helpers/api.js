import { getLoggedInUser } from '../helpers/authUtils';


export const getWebServer = () => {
    let web_server = process.env.REACT_APP_PROD_URL;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        web_server = process.env.REACT_APP_DEV_URL;
    }
    return web_server;
};

export const getAPIServer = () => {
    let api_server = process.env.REACT_APP_PROD_URL + "/api";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        api_server = process.env.REACT_APP_DEV_URL + "/api";
    }
    return api_server;
};

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchAPI = (url, options = {}) => {
    return fetch(getAPIServer() + url, options)
        .then(response => {
            if (response.status !== 200) {
                throw response;
            }
            return response.json();
        })
        .then(json => {
            if (json.status !== "success") {
                throw json;
            }

            return json;
        })
        .catch(error => {
            throw error;
        });
};

export const getRequestHeaders = (options = {}) => {
    let headers = options.headers ? options.headers : {};
    return {
        'Content-Type': 'application/json',
        ...headers
    }
};

export const getAuthRequestHeaders = (options = {}) => {
    let headers = options.headers ? options.headers : {};
    const user = getLoggedInUser();

    return {
        'Authorization': 'Bearer ' + user.token,
        ...headers,
    }
};

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
    //Default options
    options = {
        ...options,
        headers: getRequestHeaders(options)
    };

    return fetchAPI(url, options);
};


/**
 * Fetch Auth required data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchAuthJSON = (url, options = {}) => {

    //Default options
    options = {
        ...options,
        headers: getAuthRequestHeaders(options)
    };

    return fetchJSON(url, options);
};

/**
 * Fetch Auth required data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchAuthFILE = (url, options = {}) => {

    let headers = options.headers ? options.headers : {};

    const user = getLoggedInUser();

    //Default options
    options = {
        ...options,
        headers: {
            ...headers, 'Authorization': 'Bearer '+user.token
        }
    };

    return fetchAPI(url, options);
};

export {fetchJSON, fetchAuthJSON, fetchAuthFILE};

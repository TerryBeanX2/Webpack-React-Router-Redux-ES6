import es6Promise from 'es6-promise';
import 'isomorphic-fetch';
es6Promise.polyfill();

const startFetch = (url) =>({
    type:'FETCH_REQUEST',
    payload:url
});

const endFetch = (url,json)=>({
    type:'FETCH_SUCCESS',
    payload:json
});

const doFetch = (url,type,data) => (dispatch, getState) =>{
    dispatch(startFetch(url));
    return fetch(url).then(response=>response.json()).then(json=>dispatch(endFetch(url,json)));
};

export default doFetch;
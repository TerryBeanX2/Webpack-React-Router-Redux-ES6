import $ from 'jquery-ajax';

import config from '../config/config';

const get = (path, data, success, error)=> {
    $.get({
        url: config.target + path,
        data: JSON.stringify(data),
        success: function (data) {
            success(data);
            console.log(data);
        },
        error: error
    })
};
const post = (path, data, success, error)=> {
    $.post({
        url: config.target + path,
        data: JSON.stringify(data),
        success: function (data) {
            success(data);
            console.log(data);
        },
        error: error
    })
};

export default {get, post}
let host;
let supplierApi;
let locationApi;
let productDefinitionApi;
let productOrderApi;
let categoryApi;
let manufactureApi;
let headers = {};
$(document).ready(function () {
    host = window.location.origin;
    supplierApi = `${host}/api/supplier`;
    locationApi = `${host}/api/location`;
    productDefinitionApi = `${host}/api/product-definition`;
    productOrderApi = `${host}/api/product-order`;
    categoryApi = `${host}/api/category`
    manufactureApi = `${host}/api/manufacture`
    headers = {
        "Authorization" : getUser()
    }
});

const getUser = () => {
    let userId = localStorage.getItem("userId") ;
    return userId ? userId : null;
}

const httpPost = (body, url) => {
    return $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        headers: headers,
        data: JSON.stringify(body),
        dataType: "json",
        success: function (resp) {
            data = resp;
        },
        error: function (resp) {
            handleError(resp)
        },
    });
};

const httpGet = (url) => {
    return $.ajax({
        contentType: "application/json",
        dataType: "json",
        method: "GET",
        headers: headers,
        url: url,
        success: function (resp) {
            console.log(resp);
        },
        error: function (resp) {
            handleError(resp)
        },
    });
};

const httpGetSync = (url) => {
    return $.ajax({
        contentType: "application/json",
        dataType: "json",
        method: "GET",
        headers: headers,
        url: url,
        success: function (resp) {
            console.log(resp);
        },
        error: function (resp) {
            handleError(resp)
        },
        async: false
    });
};

const httpPostSync = (body, url) => {
    return $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(body),
        headers: headers,
        dataType: "json",
        success: function (resp) {
            data = resp;
        },
        error: function (resp) {
            handleError(resp)
        },
        async: false
    });
};

const httpPut = (body, url) => {
    return $.ajax({
        url: url,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(body),
        headers: headers,
        dataType: "json",
        success: function (resp) {
            data = resp;
        },
        error: function (resp) {
            handleError(resp)
        },
    });
};

const httpDelete = (body, url) => {
    return $.ajax({
        url: url,
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify(body),
        headers: headers,
        dataType: "json",
        success: function (resp) {
            data = resp;
        },
        error: function (resp) {
            handleError(resp)
        },
    });
};

const handleError = (resp) => {
    let status = resp.status;
    let error = resp.responseJSON;
    switch(status){
        case 401:{
            window.location.href = `${host}/login`
            break;
        }
        case 403:{
            window.location.href = `${host}/login`
            break;
        }
        case 500:{
            alert(error.message);
            break;
        }
        case 400:{
            alert(error.message);
            break;
        }
    }
}
let host;
let supplierApi;
let locationApi;
let productDefinitionApi;
let productOrderApi;
let categoryApi;
let manufactureApi;
let spinner;
$(document).ready(function () {
  M.AutoInit();
  host = "http://localhost:8080";
  supplierApi = `${host}/api/supplier`;
  locationApi = `${host}/api/location`;
  productDefinitionApi = `${host}/api/product-definition`;
  productOrderApi = `${host}/api/product-order`;
  categoryApi = `${host}/api/category`
  manufactureApi = `${host}/api/manufacture`
  spinner = $("#spinner-data")[0];
  getAllProductOrderData();
});

const confirmBox = (title, message, _f,body) => {
  $.confirm({
    title: title,
    content: message,
    boxWidth: "30%",
    type: "blue",
    typeAnimated: true,
    buttons: {
      submit: function () {
        console.log("confirm box body : " + body)
        if(body){
            _f(body);
        }
        
      },
      cancel: function () {},
    },
  });
};

const warning = (title, message) => {
  $.confirm({
    title: title,
    content: message,
    type: 'orange',
    typeAnimated: true,
  });
};

const error = (title,message) => {
  $.confirm({
    title: title,
    content: message,
    type: 'red',
    typeAnimated: true,
  });
}

const success = (title, message) => {
  $.confirm({
    title: title,
    content: message,
    type: "green",
    typeAnimated: true,
  });
};

const successThenDo = (title, message, _f) => {
  $.confirm({
    title: title,
    content: message,
    type: "green",
    typeAnimated: true,
    buttons: {
      confirm: {
        btnClass: "btn-blue",
        action: function () {
          _f();
        },
      },
      close: function () {},
    },
  });
};

const buildForm = (formElement) => {
  var data = {};
  var formData = $(formElement).serializeArray();
  $.each(formData, function (i, v) {
    data[`${v.name}`] = v.value;
  });
  console.log(JSON.stringify(data));
  return data;
};

const httpPost = (body, url) => {
  return $.ajax({
    url: url,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(body),
    dataType: "json",
    success: function (resp) {
      data = resp;
    },
    error: function (resp) {
      let badRequest = resp.responseJSON;
      alert(badRequest.message);
    },
  });
};

const httpGet = (url) => {
  return $.ajax({
    contentType: "application/json",
    dataType: "json",
    method: "GET",
    url: url,
    success: function (resp) {
        console.log(resp);
    },
    error: function (resp) {
      let error = resp.responseJSON;
      alert(error.message);
    },
  });
};

const httpPut = (body, url) => {
  return $.ajax({
    url: url,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(body),
    dataType: "json",
    success: function (resp) {
      data = resp;
    },
    error: function (resp) {
      let badRequest = resp.responseJSON;
      alert(badRequest.message);
    },
  });
};

const httpDelete = (url) => {
  return $.ajax({
    url: url,
    type: "DELETE",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
      data = resp;
    },
    error: function (resp) {
      let badRequest = resp.responseJSON;
      alert(badRequest.message);
    },
  });
};

const clearForm = (element) => {
  $(element)[0].reset();
};

const showSpinner = () => {
  spinner.style.display = "block";
}

const hideSpinner = () => {
    spinner.style.display = "none";
}

const regenerateSelectBox = (element) => {
  element.formSelect();
  // M.AutoInit();
}


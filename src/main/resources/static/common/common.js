let host;
let supplierApi;
let locationApi;
let productDefinitionApi;
let productOrderApi;
let categoryApi;
let manufactureApi;
let spinner;
const SUPPLIER = 'supplier';
const LOCATION = 'location';
const CATEGORY = 'category';
const MANUFACTURE = 'manufacture';
const masterData = {
  categories : [],
  locations : [],
  manufactures : [],
  suppliers : [],
}
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
  console.log($(formElement))
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

const httpGetSync = (url) => {
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
    async:false
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

const httpDelete = (body,url) => {
  return $.ajax({
    url: url,
    type: "DELETE",
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

const getAllCheckedValueByClass = (classItem) => {
  let result = [];
  $(`.${classItem}:checked`).each(function(){        
    let values = Number($(this).val());
    result.push(values);
  });
  return result;
}

const checkAllEvent = (checkBoxSelector,classes) => {
  $(checkBoxSelector).on('change',(e) => {
    $(`input:checkbox[class=${classes}]`).prop('checked', e.target.checked);  
  });  
}

const initInputField = (idForm,name,value) => {
  $(`${idForm} input[name=${name}]`).val(value);
  changeInput(name);
}

const changeInput = (idElement) => {
  $(`label[for='${idElement}']`).addClass('active');
}

const initSelectField = (idForm,name,value) => {
  $(`${idForm} select[name=${name}]`).val(value);
}

const initSelectBox = (type,idSelector,value) => {
  $(idSelector).empty();
  value = Number(value);
  switch(type){
    case MANUFACTURE : {
      let manufactures = masterData.manufactures;
      let tempOptions = [];
      let options = [];
      let firstOption = `<option value="" disabled selected>Choose product definition's ${MANUFACTURE}</option>`;
      let noneSelected = true;
      for(let i = 0; i < manufactures.length ; i ++){
        let x = manufactures[i];
        let option = `<option value="${x.getId()}" class="left circle">${x.getManufactureName()}</option>`
        if(x.id == value){
          option = `<option value="${x.getId()}" selected>${x.getManufactureName()}</option>`
          noneSelected = false;
        }
        tempOptions.push(option)
      }
      if(noneSelected){
        options.push(firstOption)
      }
      tempOptions.forEach(op => options.push(op));
      // Push to select box
      options.forEach(op => $(idSelector).append(op));
      break;
    }
    case LOCATION : {
      let locations = masterData.locations;
      let tempOptions = [];
      let options = [];
      let firstOption = `<option value="" disabled selected>Choose product definition's ${LOCATION}</option>`;
      let noneSelected = true;
      for(let i = 0; i < locations.length; i ++){
        let x = locations[i];
        let option = `<option value="${x.getId()}" class="left circle">${x.getLocationName()}</option>`
        if(x.id == value){
          option = `<option value="${x.getId()}" selected>${x.getLocationName()}</option>`
          noneSelected = false;
        }
        tempOptions.push(option)
      }
      if(noneSelected){
        options.push(firstOption)
      }
      tempOptions.forEach(op => options.push(op));
      // Push to select box
      options.forEach(op => $(idSelector).append(op));
      break;
    }
    case CATEGORY : {
      let categories = masterData.categories;
      let tempOptions = [];
      let options = [];
      let firstOption = `<option value="" disabled selected>Choose product definition's ${CATEGORY}</option>`;
      let noneSelected = true;
      for(let i = 0; i < categories.length; i ++){
        let x = categories[i];
        let option = `<option value="${x.getId()}" class="left circle">${x.getCategoryName()}</option>`
        if(x.id == value){
          option = `<option value="${x.getId()}" selected>${x.getCategoryName()}</option>`
          noneSelected = false;
        }
        tempOptions.push(option)
      }
      if(noneSelected){
        options.push(firstOption)
      }
      tempOptions.forEach(op => options.push(op));
      // Push to select box
      options.forEach(op => $(idSelector).append(op));
      break;
    }
    case SUPPLIER : {
      let suppliers = masterData.suppliers;
      let tempOptions = [];
      let options = [];
      let firstOption = `<option value="" disabled selected>Choose product definition's ${SUPPLIER}</option>`;
      let noneSelected = true;
      for(let i = 0; i < suppliers.length; i ++){
        let x = suppliers[i];
        let option = `<option value="${x.getId()}" class="left circle">${x.getSupplierName()}</option>`
        if(x.id == value){
          option = `<option value="${x.getId()}" selected>${x.getSupplierName()}</option>`
          noneSelected = false;
        }
        tempOptions.push(option)
      }
      if(noneSelected){
        options.push(firstOption)
      }
      tempOptions.forEach(op => options.push(op));
      // Push to select box
      options.forEach(op => $(idSelector).append(op));
      break;
    }
  }
  regenerateSelectBox($(idSelector));
}
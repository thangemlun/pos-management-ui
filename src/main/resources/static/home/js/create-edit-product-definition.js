let saveProductDefinitionApi;
let formSaveProductDefinitionSelector;
const SUPPLIER = 'supplier';
const LOCATION = 'location';
const CATEGORY = 'category';
const MANUFACTURE = 'manufacture';
let updatePDefModal = $('#updateProductDefinitionModal');
let createPDefModal = $('#createEditProductDefinitionModal')
let formPDefUpdateSelector = $('#update-product-definition-form')
let idUpdatePDefForm = '#update-product-definition-form';
$(document).ready(() => {
  saveProductDefinitionApi = `${productDefinitionApi}/save`;
  formSaveProductDefinitionSelector = "#create-product-definition-form";
  addProductDefinition();
  updateProductDefinition();
});

const addProductDefinition = () => {
  $("#btn-create-product-definition").click((e) => {
    e.preventDefault();
    let body = buildForm(formSaveProductDefinitionSelector);
    let productRequest = new ProductDefinition();
    productRequest.fromCreateForm(body);
    productRequest.validateAndSaveProductDefinition();
  });
};

const onUpdateModalShow = (data) => {
  console.log(updatePDefModal)
  initForm({
            sku : data.sku,
            modelName : data.modelName,
            manufactureId : data.manufacture.manufactureId,
            locationId : data.location.locationId,
            categoryId : data.category.categoryId,
            supplierId : data.supplier.supplierId})
  $('#updateProductDefinitionModal').modal('toggle');
}

const initForm = ({sku,modelName,manufactureId,locationId,categoryId,supplierId}) => {
  initInputField(idUpdatePDefForm,'sku',sku);
  initInputField(idUpdatePDefForm,'modelName',modelName);
  initSelectBox(MANUFACTURE,'#pdef-update-manufacture-select',manufactureId);
  initSelectBox(LOCATION,'#pdef-update-location-select',locationId);
  initSelectBox(CATEGORY,'#pdef-update-category-select',categoryId);
  initSelectBox(SUPPLIER,'#pdef-update-supplier-select',supplierId);
  initSelectField(idUpdatePDefForm,'manufactureId',manufactureId);
  initSelectField(idUpdatePDefForm,'locationId',locationId);
  initSelectField(idUpdatePDefForm,'categoryId',categoryId);
  initSelectField(idUpdatePDefForm,'supplierId',supplierId);
}

const updateProductDefinition = () => {
  $('#btn-update-product-definition').click((e) => {
    e.preventDefault();
    let body = buildForm(idUpdatePDefForm);
    console.log(body);
    let productRequest = new ProductDefinition();
    productRequest.fromUpdateForm(body);
    productRequest.validateAndSaveProductDefinition(true);
  })
}

const onUpdateProductDefinition = (id) => {
  let productDefinition = ProductDefinitionService.getProductDefinitionById(id);
  onUpdateModalShow(productDefinition);
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

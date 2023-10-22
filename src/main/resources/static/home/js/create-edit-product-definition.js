let saveProductDefinitionApi;
let formSaveProductDefinitionSelector;
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
            id : data.id,
            modelName : data.modelName,
            model : data.model,
            manufactureId : data.manufacture.manufactureId,
            locationId : data.location.locationId,
            categoryId : data.category.categoryId,
            supplierId : data.supplier.supplierId,
            color: data.color})
  $('#updateProductDefinitionModal').modal('toggle');
}

const initForm = ({id,modelName,model,manufactureId,locationId,categoryId,supplierId,color}) => {
  initInputField(idUpdatePDefForm,'id',id);
  initInputField(idUpdatePDefForm,'modelName',modelName);
  initInputField(idUpdatePDefForm,'model',model);
  initInputField(idUpdatePDefForm,'color',color);
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


let saveProductDefinitionApi;
let formSaveProductDefinitionSelector;
$(document).ready(() => {
  saveProductDefinitionApi = `${productDefinitionApi}/save`;
  formSaveProductDefinitionSelector = "#create-product-definition-form";
  addProductDefinition();
});

const addProductDefinition = () => {
  $("#btn-create-product-definition").click((e) => {
    e.preventDefault();
    showSpinner();
    let body = buildForm(formSaveProductDefinitionSelector);
    let productRequest = new ProductDefinition();
    productRequest.fromCreateForm(body);
    productRequest.validateAndSaveProductDefinition();
    hideSpinner();
  });
};




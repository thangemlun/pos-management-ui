let saveProductDefinitionApi;
let formUpdateProductDefinitionSelector;
$(document).ready(() => {
  saveProductDefinitionApi = `${productDefinitionApi}/save`;
  formUpdateProductDefinitionSelector = "#update-product-definition-form";
  addProductDefinition();
});

const updateProductDefinition = () => {
  $("#btn-update-product-definition").click((e) => {
    e.preventDefault();
    showSpinner();
    let body = buildForm(formUpdateProductDefinitionSelector);
    let productRequest = new ProductDefinition();
    productRequest.fromCreateForm(body);
    productRequest.validateAndSaveProductDefinition();
    hideSpinner();
  });
};




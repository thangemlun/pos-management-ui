class ProductDefinition {
  productDefinitionId;
  modelName;
  model;
  color;
  locationId;
  supplierId;
  manufactureId;
  categoryId;
  constructor() {}

  fromCreateForm(formBody) {
    this.productDefinitionId = null;
    this.modelName = formBody.modelName;
    this.model = formBody.model;
    this.color = formBody.color;
    this.locationId = formBody.locationId;
    this.supplierId = formBody.supplierId;
    this.manufactureId = formBody.manufactureId;
    this.categoryId = formBody.categoryId;
  }

  createValidation = () => {
    let isValid = true;
    if (!this.modelName) {
      warning("Missing field", "Model name can not be empty");
      isValid = false;
      return;
    }
    if (!this.model) {
      warning("Missing field", "Model can not be empty");
      isValid = false;
      return;
    }
    if (!this.color) {
      warning("Missing field", "Color can not be empty");
      isValid = false;
      return;
    }
    if (!this.locationId) {
      warning("Missing field", "Please choose Location");
      isValid = false;
      return;
    }
    if (!this.supplierId) {
      warning("Missing field", "Please choose Supplier");
      isValid = false;
      return;
    }
    if (!this.manufactureId) {
      warning("Missing field", "Please choose Manufacture");
      isValid = false;
      return;
    }
    if (!this.categoryId) {
      warning("Missing field", "Please choose Category");
      isValid = false;
      return;
    }
    return isValid;
  };

  validateAndSaveProductDefinition = () => {
    if (this.createValidation()) {
      confirmBox(
        "Add Product Definition !",
        "Do you want to add Product Definition",
        this.saveProductDefinition,
        this
      );
    }
  };

  saveProductDefinition = () => {
    if (this) {
      httpPost(this, saveProductDefinitionApi).then((resp) => {
        if (resp) {
          successThenDo(resp.status, resp.message,getAllDataProductDefinition);
          clearForm(formSaveProductDefinitionSelector);
        }
      });
    }
  };
}

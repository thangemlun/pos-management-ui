class ProductDefinition {
  productDefinitionId;
  modelName;
  locationId;
  supplierId;
  manufactureId;
  categoryId;
  constructor() {}

  fromCreateForm(formBody) {
    this.productDefinitionId = null;
    this.modelName = formBody.modelName;
    this.locationId = formBody.locationId;
    this.supplierId = formBody.supplierId;
    this.manufactureId = formBody.manufactureId;
    this.categoryId = formBody.categoryId;
  }

  fromUpdateForm(formBody) {
    this.productDefinitionId = formBody.sku;
    this.modelName = formBody.modelName;
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

  validateAndSaveProductDefinition = (update) => {
    if (this.createValidation()) {
      if (!update) {
        confirmBox(
          "Add Product Definition !",
          "Do you want to add Product Definition",
          this.saveProductDefinition,
          this
        );
      } else {
        confirmBox(
          "Update Product Definition !",
          "Do you want to update Product Definition",
          this.updateProductDefinition,
          this
        );
      }
    }
  };

  saveProductDefinition = () => {
    if (this) {
      httpPost(this, saveProductDefinitionApi).done((resp) => {
        if (resp) {
          successThenDo(resp.status, resp.message, getAllDataProductDefinition);
          clearForm(formSaveProductDefinitionSelector);
          $('#createEditProductDefinitionModal').modal('toggle');
        }
      });
    }
  };

  updateProductDefinition = () => {
    if (this) {
      httpPut(
        this,
        `${productDefinitionApi}/update`
      ).done((resp) => {
        if (resp) {
          successThenDo(resp.status, resp.message, getAllDataProductDefinition);
          clearForm(idUpdatePDefForm);
          $('#updateProductDefinitionModal').modal('toggle');
        }
      });
    }
  };
}

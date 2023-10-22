class SupplierComponent {
    deleteIds = [];
    constructor(){}
    
    validateDelete = () => {
        let isValidToDelete = true;
        if(!this.deleteIds.length > 0){
          warning("Empty checked value", "Please select at least 1 supplier to delete");
          isValidToDelete = false;
        }
        return isValidToDelete;
    }
    
    validateAndDelete = () => {
        if(this.validateDelete()) {
            confirmBox(
              "Delete Suppliers !",
              "Do you want to delete suppliers",
              this.deleteSuppliers,
              this.deleteIds
            );
          }
    }

    deleteSuppliers = () => {
        if(this.deleteIds){
          httpDelete(this.deleteIds,deleteSupplierApi).then((resp) => {
            if(resp) {
              successThenDo(resp.status, resp.message, getAllSupplierData);
            }
          });
        }
      }
}
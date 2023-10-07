class Supplier {
    id;
    supplierName ;
    action;
    constructor({id,supplierName}){
        this.id = id;
        this.supplierName = supplierName;
        this.action = {id,supplierName};
    }

    setId(id){
        this.id = id;
    }
    setSupplierName(supplierName){
        this.supplierName = supplierName;
    }
    getId(){
        return this.id;
    }
    getSupplierName(){
        return this.supplierName;
    }
}
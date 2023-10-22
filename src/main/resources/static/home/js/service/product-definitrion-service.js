class ProductDefinitionService{
    static getProductDefinitionById = (id) => {
        let api = `${productDefinitionApi}/${id}`
        let data;
        httpGetSync(api).done((resp) => {
            if (resp) {
              data = resp.data;
            }
        });
        return data;
    }
}
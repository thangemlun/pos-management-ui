let saveCategoryApi;
let addCategoryForm;
let categoryTable;
let categorySelectBox;
let btnDeleteCategories;
let deleteCategoryApi;
$(document).ready(() => {
  saveCategoryApi = `${categoryApi}/save`;
  deleteCategoryApi = `${categoryApi}/delete`
  addCategoryForm = $("#add-category-form");
  categorySelectBox = $("#category-select");
  btnDeleteCategories= $('#btn-delete-categories');
  initCategoryTableConfig();
  getAllCategoryData();
  checkAllCategories();
  addCategory();
  deleteCategories();
});

const initCategoryTableConfig = () => {
  categoryTable = new DataTable("#category-table", {
    responsive: true,
    columns: [
      {
        data: "id",
        className: "text-right",
        title: `<div class="w-100 justify-content-center">
                  <label>
                    <input type="checkbox" id="category_check_all"/>
                    <span></span>               
                  </label>
                </div>`,
        type: "string",
      },
      {
        data: "categoryName",
        className: "text-right",
        title: "Category Name",
        type: "string",
      },
      {
        data: "action",
        className: "text-right",
        title: "Action",
        type: "string",
      },
    ],
    columnDefs: categoryDef(),
  });
};
let generateCategoryTable = (categories) => {
  categoryTable.clear().rows.add(categories).draw();
};

const getAllCategoryData = () => {
  let categories = [];
  showSpinner();
  httpGet(`${categoryApi}/all`)
    .done((resp) => {
      let data = resp.data;
      if (data && data.length > 0) {
        data.forEach((x) => categories.push(new CategoryModel(x)));
      }
      categorySelectBox.empty();
      categorySelectBox.append(
        `<option value="" disabled selected>Choose product definition's category</option>`
      );
      categories.forEach((x) => {
        let option = `<option value="${x.getId()}" class="left circle">${x.getCategoryName()}</option>`;
        categorySelectBox.append(option);
        masterData.categories.push(x);
      });
      generateCategoryTable(categories);
      regenerateSelectBox(categorySelectBox);
      hideSpinner();
    })
    .fail(() => {
      generateCategoryTable([]);
      hideSpinner();
    });
};
const addCategory = () => {
  $("#category-add-btn").click(function (e) {
    e.preventDefault();
    showSpinner();
    let body = buildForm(addCategoryForm);
    body.id = null;
    let category = new CategoryModel(body);
    category.validateAndSave(category);
    hideSpinner();
  });
};

const deleteCategories = () => {
  btnDeleteCategories.click((e) => {
    e.preventDefault();
    showSpinner();
    let model = new CategoryModel({id:null,categoryName:null});
    model.deleteIds = getAllCheckedValueByClass('categoryCheckBox');
    model.validateAndDelete();
    hideSpinner();
  });
}

const checkAllCategories = () =>{
  checkAllEvent('#category_check_all','categoryCheckBox');
}

const categoryDef = () => {
  return [
    {
      targets: 0,
      render: (data) => {
        let checkBox = `<label>
                          <input type="checkbox" class="categoryCheckBox" id="category_${data}" value="${data}"/>
                          <span></span>               
                        </label>`;
        return `<div class="w-100 justify-content-center">${checkBox}</div>`;
      },
      orderable: false
    },
    {
      targets: 2,
      render: (data) => {
        let editBtn = `<a class="btn-floating waves-effect waves-light blue">
                                      <i class="large material-icons">mode_edit</i>
                                    </a>`;
        return `<div class="w-100 justify-content-center">${editBtn}</div>`;
      },
      orderable: false
    },
  ];
};

class CategoryModel {
  id;
  categoryName;
  action;
  deleteIds = [];
  constructor({ id, categoryName }) {
    this.id = id;
    this.categoryName = categoryName;
    this.action = { id, categoryName };
  }
  getId() {
    return this.id;
  }
  getCategoryName() {
    return this.categoryName;
  }
  setCategoryName(categoryName) {
    this.categoryName = categoryName;
  }

  validateField = () => {
    let isValid = true;
    if (!this.categoryName) {
      warning("Missing field", "Category name can not be empty");
      isValid = false;
    }
    return isValid;
  };

  validateDelete = () => {
      let isValidToDelete = true;
      if(!this.deleteIds.length > 0){
        warning("Empty checked value", "Please select at least 1 category to delete");
        isValidToDelete = false;
      }
      return isValidToDelete;
  }

  validateAndSave = () => {
    if (this.validateField()) {
      confirmBox(
        "Add Category !",
        "Do you want to add Category",
        this.saveCategory,
        this
      );
    }
  };

  validateAndDelete = () => {
    if(this.validateDelete()) {
      confirmBox(
        "Delete Categories !",
        "Do you want to delete categories",
        this.deleteCategories,
        this.deleteIds
      );
    }
  }

  saveCategory = () => {
    if (this) {
      httpPost(this, saveCategoryApi).then((resp) => {
        if (resp) {
          successThenDo(resp.status, resp.message, getAllCategoryData);
          clearForm(addCategoryForm);
        }
      });
    }
  };

  deleteCategories = () => {
    if(this.deleteIds){
      httpDelete(this.deleteIds,deleteCategoryApi).then((resp) => {
        if(resp) {
          successThenDo(resp.status, resp.message, getAllCategoryData);
        }
      });
    }
  }
}

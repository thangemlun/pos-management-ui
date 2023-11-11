let spinner;
const masterData = {
    categories: [],
    locations: [],
    manufactures: [],
    suppliers: [],
}
let LOCAL_SYSTEM_ZONE = moment.tz.guess();
let localStorage = window.localStorage;
$(document).ready(function () {
    M.AutoInit();
    spinner = $("#spinner-data")[0];
});
const buildForm = (formElement) => {
    var data = {};
    console.log($(formElement))
    var formData = $(formElement).serializeArray();
    $.each(formData, function (i, v) {
        data[`${v.name}`] = v.value;
    });
    console.log(JSON.stringify(data));
    return data;
};

const confirmBox = (title, message, _f, body) => {
    $.confirm({
        title: title,
        content: message,
        boxWidth: "30%",
        type: "blue",
        typeAnimated: true,
        buttons: {
            submit: function () {
                console.log("confirm box body : " + body)
                if (body) {
                    _f(body);
                }

            },
            cancel: function () { },
        },
    });
};

const showSpinner = () => {
    spinner.style.display = "block";
}

const hideSpinner = () => {
    spinner.style.display = "none";
}

const warning = (title, message) => {
    $.confirm({
        title: title,
        content: message,
        type: 'orange',
        typeAnimated: true,
    });
};

const error = (title, message) => {
    $.confirm({
        title: title,
        content: message,
        type: 'red',
        typeAnimated: true,
    });
}

const success = (title, message) => {
    $.confirm({
        title: title,
        content: message,
        type: "green",
        typeAnimated: true,
    });
};

const successThenDo = (title, message, _f) => {
    $.confirm({
        title: title,
        content: message,
        type: "green",
        typeAnimated: true,
        buttons: {
            confirm: {
                btnClass: "btn-blue",
                action: function () {
                    _f();
                },
            },
            close: function () { },
        },
    });
};

const clearForm = (element) => {
    $(element)[0].reset();
};

const getAllCheckedValueByClass = (classItem) => {
    let result = [];
    $(`.${classItem}:checked`).each(function () {
        let values = Number($(this).val());
        result.push(values);
    });
    return result;
}

const checkAllEvent = (checkBoxSelector, classes) => {
    $(checkBoxSelector).on('change', (e) => {
        $(`input:checkbox[class=${classes}]`).prop('checked', e.target.checked);
    });
}

const initInputField = (idForm, name, value) => {
    $(`${idForm} input[name=${name}]`).val(value);
    changeInput(name);
}

const changeInput = (idElement) => {
    $(`label[for='${idElement}']`).addClass('active');
}

const initSelectField = (idForm, name, value) => {
    $(`${idForm} select[name=${name}]`).val(value);
}

const regenerateSelectBox = (element) => {
    element.formSelect();
    // M.AutoInit();
}
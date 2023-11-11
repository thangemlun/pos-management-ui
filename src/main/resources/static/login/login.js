let authApi;
let spinnerLogin = $("#spinner-login");
$(document).ready(function () {
    authApi = `${host}/access`;
    spinnerLogin.hide();
    onLogin();
});

const onLogin = () => {
    $('#btn_login').click((e) => {
        e.preventDefault();
        spinnerLogin.show();
        console.log(authApi)
        let body = buildForm('#formLogin');
        let rq = {
            time:new Date().getTime(),
            k:btoa(`${body.username},${body.password}`)
        }
        httpPostSync(rq,authApi).done((resp) => {
            if(resp.data){
                localStorage.setItem("userId",resp.data);
                spinnerLogin.hide();
                window.location.href = `${host}/home`
            }else{
                window.location.href = `${host}/login`
            }
        });
    })
} 
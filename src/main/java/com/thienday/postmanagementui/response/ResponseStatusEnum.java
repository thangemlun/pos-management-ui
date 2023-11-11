package com.thienday.postmanagementui.response;

public enum ResponseStatusEnum {
    SUCCESS("success"),
    FAILED("Fail")
    ;
    private String status;
    ResponseStatusEnum(String status){
        this.status = status;
    }
    public String getStatus(){
        return this.status;
    }
}

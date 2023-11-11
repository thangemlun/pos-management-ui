package com.thienday.postmanagementui.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DataResponse<T>{
    String status;
    String message;
    T data;

    public static <T> DataResponse apiResult(T data, String message){
        return DataResponse.builder()
                .data(data)
                .message(message)
                .status(ResponseStatusEnum.SUCCESS.getStatus())
                .build();
    }

    public static <T> DataResponse apiError(String message){
        return DataResponse.builder()
                .data(null)
                .message(message)
                .status(ResponseStatusEnum.FAILED.getStatus())
                .build();
    }
}

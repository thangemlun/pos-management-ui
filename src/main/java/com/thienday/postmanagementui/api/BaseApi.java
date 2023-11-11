package com.thienday.postmanagementui.api;

import com.thienday.postmanagementui.gateway.ApiGateway;
import com.thienday.postmanagementui.response.DataResponse;
import com.thienday.postmanagementui.util.TokenCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Objects;

@Component
public class BaseApi {

    private final String POS_MANAGEMENT_API = System.getenv("pos_management_api");

    public ResponseEntity<DataResponse> execute(String application, String path,Object body, HttpMethod method,String loginString){
        try{
            String token = TokenCache.getToken(loginString);
            if(!Objects.nonNull(token)){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(DataResponse.apiError("Not Authorized"));
            }
            RestTemplate restTemplate = new RestTemplate();
            String url = new String(POS_MANAGEMENT_API + getApi(application)).concat("/" + path);
            HttpEntity entity = new HttpEntity(body,getHeaders(token));
            ResponseEntity<DataResponse> resp = restTemplate.exchange(url,method,entity, DataResponse.class);
            return ResponseEntity.status(HttpStatus.OK).body(resp.getBody());
        }catch (HttpClientErrorException.Forbidden ex){
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(DataResponse.apiError("Token Invalid"));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(DataResponse.apiError("Error : {}" + e.getMessage()));
        }
    }

    public ResponseEntity<DataResponse> getToken(String application, String path,Object body, HttpMethod method,String loginString){
        try{
            RestTemplate restTemplate = new RestTemplate();
            String url = new String(POS_MANAGEMENT_API + getApi(application)).concat("/" + path);
            HttpEntity entity = new HttpEntity(body,new HttpHeaders());
            return restTemplate.exchange(url,method,entity, DataResponse.class);
        }catch (WebClientResponseException e){
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode())
                    .body(DataResponse.apiError("Error : {}" + e.getMessage()));
        }
    }

    private HttpHeaders getHeaders(String token){
        HttpHeaders header = new HttpHeaders();
        header.set("Authorization",String.format("Bearer %s",token));
        header.setContentType(MediaType.APPLICATION_JSON);
        return header;
    }

    private String getApi(String applicationId){
        return ApiGateway.uriMap.get(applicationId);
    }

}

package com.thienday.postmanagementui.api;

import com.thienday.postmanagementui.request.AccessKey;
import com.thienday.postmanagementui.response.DataResponse;
import com.thienday.postmanagementui.util.TokenCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Objects;

@RestController
@RequestMapping("/access")
@Slf4j
public class AccessTokenApi extends BaseApi{
    @PostMapping
    public ResponseEntity getToken(@RequestBody AccessKey key){
        log.info("Login at {}", new Date(key.getTime()));
        String token = (String) getToken("auth","login",key.getK(), HttpMethod.POST,key.getK()).getBody()
                .getData();
        if(Objects.nonNull(token)){
            TokenCache.store(key.getK(),token);
        }
        return ResponseEntity.ok(DataResponse.apiResult(key.getK(),String.format("time - %s",new Date().getTime())));
    }
}

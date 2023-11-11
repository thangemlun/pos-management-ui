package com.thienday.postmanagementui.api;

import com.thienday.postmanagementui.response.DataResponse;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiCall extends BaseApi{
    @GetMapping("/{application}/{path}")
    public ResponseEntity get(@PathVariable String application,
                              @PathVariable String path,
                              @RequestHeader(name = "Authorization") String loginString){
        return this.execute(application,path,null, HttpMethod.GET,loginString);
    }
    @PostMapping("/{application}/{path}")
    public ResponseEntity post(@PathVariable String application,
                               @PathVariable String path,
                               @RequestHeader(name = "Authorization") String loginString,
                               @RequestBody Object body){
        return execute(application,path,body,HttpMethod.POST,loginString);
    }
    @PutMapping("/{application}/{path}")
    public ResponseEntity put(@PathVariable String application,
                              @PathVariable String path,
                              @RequestHeader(name = "Authorization") String loginString,
                              @RequestBody Object body) {
        return execute(application,path,body,HttpMethod.PUT,loginString);
    }
    @DeleteMapping("/{application}/{path}")
    public ResponseEntity delete(@PathVariable String application,
                                 @PathVariable String path,
                                 @RequestHeader(name = "Authorization") String loginString){
        return execute(application,path,null,HttpMethod.DELETE,loginString);
    }
}

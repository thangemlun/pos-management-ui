package com.thienday.postmanagementui.gateway;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class ApiGateway {
    public static Map<String,String> uriMap = new HashMap<>();

    @PostConstruct
    public void init(){
        uriMap = Stream.of(new String[][] {
                {"auth", "/api/auth"},
                {"product-definition", "/api/product-definition"},
                {"location", "/api/location"},
                {"category", "/api/category"},
                {"manufacture", "/api/manufacture"},
                {"product-order", "/api/product-order"},
                {"supplier", "/api/supplier"}
        }).collect(Collectors.collectingAndThen(
                Collectors.toMap(data -> data[0], data -> data[1],(s, s2) -> s),
                LinkedHashMap::new));
    }


}

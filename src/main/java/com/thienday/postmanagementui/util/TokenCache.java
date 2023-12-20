package com.thienday.postmanagementui.util;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;

public class TokenCache {
    private static final Map<String,String> userToken = new HashMap<>();

    public static void store(String loginString,String token){
        if(userToken.containsKey(loginString)){
            userToken.replace(loginString,token);
        }else
            userToken.put(loginString,token);
    }

    public static String getToken(String loginString){
        if(userToken.containsKey(loginString)){
            String authorizeToken = userToken.get(loginString);
            System.out.println(String.format("USER ID : %s - %s",loginString,authorizeToken));
            return authorizeToken;
        }else {
            return null;
        }
    }
}

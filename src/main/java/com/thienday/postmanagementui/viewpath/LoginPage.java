package com.thienday.postmanagementui.viewpath;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/login")
public class LoginPage extends BaseView{
    @GetMapping
    public ModelAndView login(){
        Map<String,Object> attributes = new HashMap<>();
//        attributes.put("template","product-order-component");
        return generateView("login/login",attributes);
    }
}

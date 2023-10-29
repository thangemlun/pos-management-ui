package com.thienday.postmanagementui.viewpath;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/product-definition")
public class ProductDefinitionPage  extends BaseView{
    @GetMapping
    ModelAndView getProductDefinitionPage(){
        Map<String,Object> attributes = new HashMap<>();
        attributes.put("templateProduct","product-definition-component");
        return generateView("common/common",attributes);
    }
}

package com.thienday.postmanagementui.viewpath;

import org.springframework.web.servlet.ModelAndView;

import java.util.Map;
import java.util.Objects;

public class BaseView {
    public ModelAndView generateView(String pathView, Map<String,Object> attributes){
        ModelAndView view = new ModelAndView();
        view.setViewName(pathView);
        if(Objects.nonNull(attributes)){
            attributes.entrySet().forEach(e -> {
                view.addObject(e.getKey(),e.getValue());
            });
        }
        return view;
    }
}

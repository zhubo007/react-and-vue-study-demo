package com.bobo.server.controller;

import com.bobo.server.entity.project.Product;
import com.bobo.server.service.ProductService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/product")
public class ProductController {

    @Resource
    private ProductService productService;

    @GetMapping(path = "/all")
    public Object getAllProject(String productName, String brandType){
        return productService.getAllProject(productName, brandType);
    }

    @PostMapping(path = "/add")
    public Object addProject(@RequestBody Product product){
        return productService.addProject(product);
    }
}

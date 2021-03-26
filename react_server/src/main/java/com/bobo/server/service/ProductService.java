package com.bobo.server.service;

import com.bobo.server.entity.project.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProject(String productName, String brandType);

    int addProject(Product product);

    int deleteProject(Integer productId);

    int updateProject(Product product);
}
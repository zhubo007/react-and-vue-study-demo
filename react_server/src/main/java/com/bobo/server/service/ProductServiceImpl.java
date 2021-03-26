package com.bobo.server.service;

import com.bobo.server.dao.project.ProductMapper;
import com.bobo.server.entity.project.Product;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Resource
    private ProductMapper productMapper;

    @Override
    public List<Product> getAllProject(String productName, String brandType) {
        return productMapper.selectProjectList(productName, brandType);
    }

    @Override
    public int addProject(Product product) {
        return productMapper.insertSelective(product);
    }

    @Override
    public int deleteProject(Integer productId) {
        return productMapper.deleteByPrimaryKey(productId);
    }

    @Override
    public int updateProject(Product product) {
        return productMapper.updateByPrimaryKeySelective(product);
    }
}

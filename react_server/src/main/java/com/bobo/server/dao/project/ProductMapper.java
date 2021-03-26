package com.bobo.server.dao.project;

import com.bobo.server.entity.project.Product;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductMapper {

    int deleteByPrimaryKey(Integer productId);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(Integer productId);

    List<Product> selectProjectList(@Param("productName") String productName, @Param("brandType") String brandType);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);

}
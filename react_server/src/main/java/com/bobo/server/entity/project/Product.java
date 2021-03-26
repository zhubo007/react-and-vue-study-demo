package com.bobo.server.entity.project;

import java.math.BigDecimal;
import java.util.Date;

public class Product {

    private Integer productId;

    private String productName;

    private Date followTime;

    private BigDecimal expectPrice;

    private BigDecimal startPrice;

    private String productType;

    private String brandType;

    private Integer fiveLevel;

    private String reference;

    private String productDie;

    private Integer isVisible;

    private String brandName;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName == null ? null : productName.trim();
    }

    public Date getFollowTime() {
        return followTime;
    }

    public void setFollowTime(Date followTime) {
        this.followTime = followTime;
    }

    public BigDecimal getExpectPrice() {
        return expectPrice;
    }

    public void setExpectPrice(BigDecimal expectPrice) {
        this.expectPrice = expectPrice;
    }

    public BigDecimal getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(BigDecimal startPrice) {
        this.startPrice = startPrice;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getBrandType() {
        return brandType;
    }

    public void setBrandType(String brandType) {
        this.brandType = brandType;
    }

    public Integer getFiveLevel() {
        return fiveLevel;
    }

    public void setFiveLevel(Integer fiveLevel) {
        this.fiveLevel = fiveLevel;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference == null ? null : reference.trim();
    }

    public String getProductDie() {
        return productDie;
    }

    public void setProductDie(String productDie) {
        this.productDie = productDie == null ? null : productDie.trim();
    }

    public Integer getIsVisible() {
        return isVisible;
    }

    public void setIsVisible(Integer isVisible) {
        this.isVisible = isVisible;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }
}
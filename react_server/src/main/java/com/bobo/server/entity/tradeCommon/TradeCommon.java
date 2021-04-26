package com.bobo.server.entity.tradeCommon;

import java.math.BigDecimal;
import java.util.Date;

public class TradeCommon {
    private String dealNo;

    private Integer productId;

    private String seller;

    private String buyer;

    private String payWay;

    private Integer payType;

    private Integer productNum;

    private BigDecimal productPrice;

    private BigDecimal totalPrice;

    private String platformId;

    private String discountDie;

    private String featureDie;

    private Date recordTime;

    private String pictureOne;

    private String pictureTwo;

    private String pictureThree;

    private Integer isValidData;

    private String platformName;

    private String payWayName;

    private String buyerName;

    private String sellerName;

    private String brandName;

    private String productName;

    private BigDecimal expectPrice;

    private BigDecimal startPrice;

    public String getDealNo() {
        return dealNo;
    }

    public void setDealNo(String dealNo) {
        this.dealNo = dealNo == null ? null : dealNo.trim();
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public String getPayWay() {
        return payWay;
    }

    public void setPayWay(String payWay) {
        this.payWay = payWay == null ? null : payWay.trim();
    }

    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }

    public Integer getProductNum() {
        return productNum;
    }

    public void setProductNum(Integer productNum) {
        this.productNum = productNum;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getPlatformId() {
        return platformId;
    }

    public void setPlatformId(String platformId) {
        this.platformId = platformId;
    }

    public String getDiscountDie() {
        return discountDie;
    }

    public void setDiscountDie(String discountDie) {
        this.discountDie = discountDie == null ? null : discountDie.trim();
    }

    public String getFeatureDie() {
        return featureDie;
    }

    public void setFeatureDie(String featureDie) {
        this.featureDie = featureDie == null ? null : featureDie.trim();
    }

    public Date getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(Date recordTime) {
        this.recordTime = recordTime;
    }

    public String getPictureOne() {
        return pictureOne;
    }

    public void setPictureOne(String pictureOne) {
        this.pictureOne = pictureOne == null ? null : pictureOne.trim();
    }

    public String getPictureTwo() {
        return pictureTwo;
    }

    public void setPictureTwo(String pictureTwo) {
        this.pictureTwo = pictureTwo == null ? null : pictureTwo.trim();
    }

    public String getPictureThree() {
        return pictureThree;
    }

    public void setPictureThree(String pictureThree) {
        this.pictureThree = pictureThree == null ? null : pictureThree.trim();
    }

    public Integer getIsValidData() {
        return isValidData;
    }

    public void setIsValidData(Integer isValidData) {
        this.isValidData = isValidData;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getPayWayName() {
        return payWayName;
    }

    public void setPayWayName(String payWayName) {
        this.payWayName = payWayName;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getBrandName() {
        return brandName;
    }

    public TradeCommon setBrandName(String brandName) {
        this.brandName = brandName;
        return this;
    }

    public String getProductName() {
        return productName;
    }

    public TradeCommon setProductName(String productName) {
        this.productName = productName;
        return this;
    }

    public BigDecimal getExpectPrice() {
        return expectPrice;
    }

    public TradeCommon setExpectPrice(BigDecimal expectPrice) {
        this.expectPrice = expectPrice;
        return this;
    }

    public BigDecimal getStartPrice() {
        return startPrice;
    }

    public TradeCommon setStartPrice(BigDecimal startPrice) {
        this.startPrice = startPrice;
        return this;
    }
}
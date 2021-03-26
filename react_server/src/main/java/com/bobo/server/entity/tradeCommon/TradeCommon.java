package com.bobo.server.entity.tradeCommon;

import java.math.BigDecimal;
import java.util.Date;

public class TradeCommon {
    private String dealNo;

    private Integer productId;

    private Integer seller;

    private Integer buyer;

    private String payWay;

    private Integer payType;

    private Integer productNum;

    private BigDecimal productPrice;

    private BigDecimal totalPrice;

    private Integer platformId;

    private String discountDie;

    private String featureDie;

    private Date recordTime;

    private String pictureOne;

    private String pictureTwo;

    private String pictureThree;

    private Integer isValidData;

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

    public Integer getSeller() {
        return seller;
    }

    public void setSeller(Integer seller) {
        this.seller = seller;
    }

    public Integer getBuyer() {
        return buyer;
    }

    public void setBuyer(Integer buyer) {
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

    public Integer getPlatformId() {
        return platformId;
    }

    public void setPlatformId(Integer platformId) {
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
}
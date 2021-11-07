package com.bobo.server.entity.cashbook;

import java.util.Date;

public class TdCashBook {
    private String dealNo;      //主键ID

    private String incomeOrExpense;    //支出或收入的标志 income expense

    private Date postDate;      //支出或收入的日期

    private Double amt;         //金额

    private String userId;      //归属人

    private String remark;      //描述

    private Integer isActive;   //有效标志  1有效 0无效

    private String ieCode;      //支出收入的类别 参照expensesType 和 incomeType

    private String ieCodeName;      //支出收入的类别 参照expensesType 和 incomeType

    public String getDealNo() {
        return dealNo;
    }

    public void setDealNo(String dealNo) {
        this.dealNo = dealNo == null ? null : dealNo.trim();
    }

    public String getIncomeOrExpense() {
        return incomeOrExpense;
    }

    public void setIncomeOrExpense(String incomeOrExpense) {
        this.incomeOrExpense = incomeOrExpense;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public Double getAmt() {
        return amt;
    }

    public void setAmt(Double amt) {
        this.amt = amt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Integer getIsActive() {
        return isActive;
    }

    public void setIsActive(Integer isActive) {
        this.isActive = isActive;
    }

    public String getIeCode() {
        return ieCode;
    }

    public void setIeCode(String ieCode) {
        this.ieCode = ieCode;
    }

    public String getIeCodeName() {
        return ieCodeName;
    }

    public void setIeCodeName(String ieCodeName) {
        this.ieCodeName = ieCodeName;
    }
}
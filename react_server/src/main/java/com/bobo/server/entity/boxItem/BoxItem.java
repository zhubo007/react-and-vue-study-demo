package com.bobo.server.entity.boxItem;

public class BoxItem {
    private Integer boxId;

    private String boxText;

    private Integer sort;

    private String boxCodeP;

    private String boxCode;

    public Integer getBoxId() {
        return boxId;
    }

    public void setBoxId(Integer boxId) {
        this.boxId = boxId;
    }

    public String getBoxText() {
        return boxText;
    }

    public void setBoxText(String boxText) {
        this.boxText = boxText == null ? null : boxText.trim();
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public String getBoxCodeP() {
        return boxCodeP;
    }

    public void setBoxCodeP(String boxCodeP) {
        this.boxCodeP = boxCodeP == null ? null : boxCodeP.trim();
    }

    public String getBoxCode() {
        return boxCode;
    }

    public void setBoxCode(String boxCode) {
        this.boxCode = boxCode;
    }
}
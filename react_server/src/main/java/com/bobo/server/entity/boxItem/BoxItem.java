package com.bobo.server.entity.boxItem;

public class BoxItem {
    private String boxId;

    private String boxKey;

    private String boxText;

    private Integer sort;

    private String boxName;

    private String boxCode;

    public String getBoxId() {
        return boxId;
    }

    public void setBoxId(String boxId) {
        this.boxId = boxId == null ? null : boxId.trim();
    }

    public String getBoxKey() {
        return boxKey;
    }

    public void setBoxKey(String boxKey) {
        this.boxKey = boxKey == null ? null : boxKey.trim();
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

    public String getBoxName() {
        return boxName;
    }

    public void setBoxName(String boxName) {
        this.boxName = boxName == null ? null : boxName.trim();
    }

    public String getBoxCode() {
        return boxCode;
    }

    public void setBoxCode(String boxCode) {
        this.boxCode = boxCode;
    }
}
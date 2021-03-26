package com.bobo.server.service;

import com.bobo.server.entity.boxItem.BoxItem;

import java.util.List;

public interface BoxItemService {

    List<BoxItem> selectBoxItem(String boxId, String boxName);
}

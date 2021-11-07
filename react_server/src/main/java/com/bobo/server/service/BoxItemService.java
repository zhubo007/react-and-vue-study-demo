package com.bobo.server.service;

import com.bobo.server.entity.boxItem.BoxItem;

import java.util.List;

public interface BoxItemService {

    List<BoxItem> selectBoxItem(String boxCodeP);

    Integer deleteBoxItem(Integer boxId);

    Integer updateBoxItem(BoxItem boxItem);

    Integer addBoxItem(BoxItem boxItem);
}

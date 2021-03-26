package com.bobo.server.service;

import com.bobo.server.dao.boxItem.BoxItemMapper;
import com.bobo.server.entity.boxItem.BoxItem;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BoxItemServiceImpl implements BoxItemService {

    @Resource
    private BoxItemMapper boxItemMapper;

    @Override
    public List<BoxItem> selectBoxItem(String boxId, String boxName) {
        return boxItemMapper.selectBoxItem(boxId, boxName);
    }
}

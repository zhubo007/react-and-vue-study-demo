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
    public List<BoxItem> selectBoxItem(String boxCodeP) {
        return boxItemMapper.selectBoxItem(boxCodeP);
    }

    @Override
    public Integer deleteBoxItem(Integer boxId) {
        return boxItemMapper.deleteByPrimaryKey(boxId);
    }

    @Override
    public Integer updateBoxItem(BoxItem boxItem) {
        return boxItemMapper.updateByPrimaryKey(boxItem);
    }

    @Override
    public Integer addBoxItem(BoxItem boxItem) {
        return boxItemMapper.insertSelective(boxItem);
    }
}

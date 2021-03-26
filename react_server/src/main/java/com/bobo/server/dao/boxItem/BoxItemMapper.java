package com.bobo.server.dao.boxItem;

import com.bobo.server.entity.boxItem.BoxItem;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BoxItemMapper {
    int deleteByPrimaryKey(String boxId);

    int insert(BoxItem record);

    int insertSelective(BoxItem record);

    BoxItem selectByPrimaryKey(String boxId);

    int updateByPrimaryKeySelective(BoxItem record);

    int updateByPrimaryKey(BoxItem record);

    List<BoxItem> selectBoxItem(@Param("boxId") String boxId, @Param("boxName") String boxName);

}
package com.bobo.server.dao.tradeCommon;

import com.bobo.server.entity.tradeCommon.TradeCommon;

public interface TradeCommonMapper {
    int deleteByPrimaryKey(String dealNo);

    int insert(TradeCommon record);

    int insertSelective(TradeCommon record);

    TradeCommon selectByPrimaryKey(String dealNo);

    int updateByPrimaryKeySelective(TradeCommon record);

    int updateByPrimaryKey(TradeCommon record);
}
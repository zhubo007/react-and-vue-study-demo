package com.bobo.server.dao.tradeCommon;

import com.bobo.server.entity.tradeCommon.TradeCommon;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeCommonMapper {
    int deleteByPrimaryKey(String dealNo);

    int insert(TradeCommon record);

    int insertSelective(TradeCommon record);

    List<TradeCommon> selectByPrimaryKey(@Param("dealNo") String dealNo, @Param("platformId") String platformId, @Param("payWay") String payWay);

    int updateByPrimaryKeySelective(TradeCommon record);

    int updateByPrimaryKey(TradeCommon record);
}
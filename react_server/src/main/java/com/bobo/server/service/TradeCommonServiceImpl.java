package com.bobo.server.service;

import com.bobo.server.dao.tradeCommon.TradeCommonMapper;
import com.bobo.server.entity.tradeCommon.TradeCommon;
import com.bobo.server.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeCommonServiceImpl implements TradeCommonService {

    @Autowired
    private TradeCommonMapper tradeCommonMapper;

    @Override
    public List<TradeCommon> getAllTradeCommon(String dealNo, String platformId, String payWay) {
        return tradeCommonMapper.selectByPrimaryKey(dealNo, platformId, payWay);
    }

    @Override
    public TradeCommon addTradeCommon(TradeCommon tradeCommon) {
        tradeCommon.setDealNo(CommonUtil.getDealNo("TC"));
        tradeCommon.setIsValidData(1);
        tradeCommonMapper.insertSelective(tradeCommon);
        return tradeCommon;
    }

    @Override
    public TradeCommon updateTradeCommon(TradeCommon tradeCommon) {
        tradeCommonMapper.updateByPrimaryKeySelective(tradeCommon);
        return tradeCommon;
    }

    @Override
    public Integer deleteTradeCommon(String dealNo) {
        return tradeCommonMapper.deleteByPrimaryKey(dealNo);
    }
}

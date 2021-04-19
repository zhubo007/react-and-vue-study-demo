package com.bobo.server.service;

import com.bobo.server.dao.tradeCommon.TradeCommonMapper;
import com.bobo.server.entity.tradeCommon.TradeCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeCommonServiceImpl implements TradeCommonService {

    @Autowired
    private TradeCommonMapper tradeCommonMapper;

    @Override
    public List<TradeCommon> getAllTradeCommon() {
        return tradeCommonMapper.selectByPrimaryKey(null);
    }
}

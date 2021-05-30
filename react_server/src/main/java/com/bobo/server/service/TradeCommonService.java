package com.bobo.server.service;


import com.bobo.server.entity.tradeCommon.TradeCommon;

import java.util.List;

public interface TradeCommonService {

    List<TradeCommon> getAllTradeCommon(String dealNo, String platformId, String payWay);

    TradeCommon addTradeCommon(TradeCommon tradeCommon);

    TradeCommon updateTradeCommon(TradeCommon tradeCommon);

    Integer deleteTradeCommon(String dealNo);
}

package com.bobo.server.controller;

import com.bobo.server.entity.tradeCommon.TradeCommon;
import com.bobo.server.service.TradeCommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/tradeCommonController")
public class TradeCommonController {

    @Autowired
    private TradeCommonService tradeCommonService;

    @GetMapping(path = "/all")
    public Object getAllTradeCommon(String dealNo, String platformId, String payWay){
        return tradeCommonService.getAllTradeCommon(dealNo, platformId, payWay);
    }

    @PostMapping(path = "/add")
    public Object addTradeCommon(@RequestBody TradeCommon tradeCommon){
        return tradeCommonService.addTradeCommon(tradeCommon);
    }

    @PostMapping(path = "/update/{dealNo}")
    public Object updateTradeCommon(@RequestBody TradeCommon tradeCommon){
        return tradeCommonService.updateTradeCommon(tradeCommon);
    }

    @PostMapping(path = "/delete/{dealNo}")
    public Object deleteTradeCommon(@PathVariable String dealNo){
        return tradeCommonService.deleteTradeCommon(dealNo);
    }

}

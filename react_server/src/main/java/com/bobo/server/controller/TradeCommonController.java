package com.bobo.server.controller;

import com.bobo.server.service.TradeCommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/tradeCommonController")
public class TradeCommonController {

    @Autowired
    private TradeCommonService tradeCommonService;

    @GetMapping(path = "/all")
    public Object getAllProject(){
        return tradeCommonService.getAllTradeCommon();
    }

}

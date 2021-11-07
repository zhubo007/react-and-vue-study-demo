package com.bobo.server.controller;

import com.bobo.server.entity.cashbook.TdCashBook;
import com.bobo.server.service.CashBookService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/cashBook")
public class CashBookController {

    @Resource
    private CashBookService cashBookService;

    @GetMapping(path = "/all")
    public Object getAllProject(String ieCode,String incomeOrExpense){
        return cashBookService.selectCashBook(ieCode, incomeOrExpense);
    }

    @PostMapping(path = "/add")
    public Object addProject(@RequestBody TdCashBook cashBook){
        return cashBookService.addCashBook(cashBook);
    }

    @PostMapping(path = "/update/{dealNo}")
    public Object updateProject(@RequestBody TdCashBook cashBook){
        return cashBookService.updateCashBook(cashBook);
    }

    @PostMapping(path = "/delete/{dealNo}")
    public Object deleteProject(@PathVariable(name = "dealNo") String dealNo){
        return cashBookService.deleteCashBook(dealNo);
    }
}
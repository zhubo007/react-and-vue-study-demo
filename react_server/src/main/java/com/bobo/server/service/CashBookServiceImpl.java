package com.bobo.server.service;

import com.bobo.server.dao.cashbook.TdCashBookMapper;
import com.bobo.server.entity.cashbook.TdCashBook;
import com.bobo.server.utils.CommonUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class CashBookServiceImpl implements CashBookService {

    @Resource
    private TdCashBookMapper cashBookMapper;

    @Override
    public List<TdCashBook> selectCashBook(String ieCode,String incomeOrExpense) {
        return cashBookMapper.selectCashBook(ieCode,incomeOrExpense);
    }

    @Override
    public Integer addCashBook(TdCashBook cashBook) {
        cashBook.setIsActive(1);
        cashBook.setUserId("admin");
//        Date postDate = cashBook.getPostDate();
//        LocalDate localPostDate = postDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
//        int year = localPostDate.getYear();
//        String month = CommonUtil.getMonthString(localPostDate.getMonthValue());
        String dealNo = CommonUtil.getDealNo("EP" );
        cashBook.setDealNo(dealNo);
        if (cashBook.getAmt()>0&&"expense".equals(cashBook.getIncomeOrExpense())){//支出需要为负数
            cashBook.setAmt(-cashBook.getAmt());
        }
        return cashBookMapper.insertSelective(cashBook);
    }

    @Override
    public Integer updateCashBook(TdCashBook cashBook) {
        if (cashBook.getAmt()>0&&"expense".equals(cashBook.getIncomeOrExpense())){//支出需要为负数
            cashBook.setAmt(-cashBook.getAmt());
        }
        return cashBookMapper.updateByPrimaryKeySelective(cashBook);
    }

    @Override
    public Integer deleteCashBook(String dealNo) {
        return cashBookMapper.deleteByPrimaryKey(dealNo);
    }
}

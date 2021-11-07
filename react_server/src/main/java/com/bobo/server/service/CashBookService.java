package com.bobo.server.service;

import com.bobo.server.entity.cashbook.TdCashBook;

import java.util.List;

public interface CashBookService {

    List<TdCashBook> selectCashBook(String ieCode,String incomeOrExpense);

    Integer addCashBook(TdCashBook cashBook);

    Integer updateCashBook(TdCashBook cashBook);

    Integer deleteCashBook(String dealNo);
}

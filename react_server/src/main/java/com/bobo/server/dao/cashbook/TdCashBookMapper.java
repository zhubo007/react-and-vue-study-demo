package com.bobo.server.dao.cashbook;

import com.bobo.server.entity.cashbook.TdCashBook;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TdCashBookMapper {
    int deleteByPrimaryKey(String dealNo );

    int insert(TdCashBook record);

    int insertSelective(TdCashBook record);

    List<TdCashBook> selectCashBook(@Param("ieCode") String ieCode,@Param("incomeOrExpense") String incomeOrExpense);

    int updateByPrimaryKeySelective(TdCashBook record);

    int updateByPrimaryKey(TdCashBook record);
}
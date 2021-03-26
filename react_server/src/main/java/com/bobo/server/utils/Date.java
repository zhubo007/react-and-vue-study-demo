package com.bobo.server.utils;

import java.time.LocalDate;

public class Date extends java.util.Date {

    public void sub(java.util.Date date){
        LocalDate localDate = LocalDate.now();
        localDate.plusYears(1);
    }
}

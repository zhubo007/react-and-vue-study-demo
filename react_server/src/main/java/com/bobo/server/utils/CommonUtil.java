package com.bobo.server.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommonUtil {

    public static String getDealNo(String pre){
        return pre.concat(LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYYMMddHHmmsss")));
    }

}

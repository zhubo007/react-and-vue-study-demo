package com.bobo.server.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class CommonUtil {

    public static String getDealNo(String pre){
        return pre.concat(LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYYMMddHHmmss")));
    }
    public static String getUUID(){
        return UUID.randomUUID().toString().replace("-", "").toLowerCase();
    }
}

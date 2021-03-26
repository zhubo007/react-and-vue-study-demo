package com.bobo.server.utils;

public class StringUtils {

    public static final int LENGTH = 100;
    public static int sum3 = 0;

    public static void main(String[] args) {
        Integer sum = sum(9);
        Integer sum2 = sum2(9);
        System.out.println(sum+"===="+sum2);


        sum3(1,9);

        System.out.println(sum3);
    }

    private static Integer sum(int day) {
        int count = 0;//骑士获取的总金币
        int startCount = 1;//每次加上金币的个数，随天数变化
        int dayCount = 0;//每加一次，天数加一次，直到dayCount>传过来的参数值，跳出循环
        all:
        while (true) {
            for (int i = 0; i < startCount; i++) {
                dayCount = dayCount + 1;
                if (dayCount > day) {
                    break all;
                }else {
                    count = count + startCount;
                }
            }
            startCount = startCount + 1;
        }
        return count;
    }

     static Integer sum2(int day) {
        int count = 0;//骑士获取的总金币

       for(int i=0;(1+i)*i/2<=day;i++){
           for (int d=(1+i)*i/2;d<(1+i)*(i+2)/2 &&d<day;d++){
               count+=(i+1);//第d天发i+1个金币
           }
       }

        return count;
    }

    static Integer sum3(int d,int day) {
        if(d*(d+1)/2>day){
            sum3+=d*(day-d*(d-1)/2);
            return day-d*(d-1)/2;
        }else {
            sum3+=d*d;
            return sum3(d + 1, day);
        }
    }
}

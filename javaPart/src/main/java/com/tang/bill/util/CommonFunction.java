package com.tang.bill.util;

import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Component
public class CommonFunction {
  public Date[] generateStartDateAndEndDateOfMonth(int year, int month) {
    Calendar cal = Calendar.getInstance();
    int firstDay = cal.getMinimum(Calendar.DATE);
    cal.set(year, month, firstDay - 1, 23, 59, 59);
    Date firstDate = cal.getTime();

    Calendar cal2 = Calendar.getInstance();
    cal2.set(Calendar.YEAR, year);
    cal2.set(Calendar.MONTH, month);
    int lastDay = cal2.getActualMaximum(Calendar.DAY_OF_MONTH);
    cal2.set(year, month, lastDay, 23, 59, 59);
    Date lastDate = cal2.getTime();

    return new Date[]{firstDate, lastDate};
  }

  public static String timeStamp2Date(Long time) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//要转换的时间格式
    Date date;
    try {
      date = sdf.parse(sdf.format(time));
      return sdf.format(date);
    } catch (ParseException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static String timeStamp2Date(Long time, String dateType) {
    SimpleDateFormat sdf = new SimpleDateFormat(dateType);//要转换的时间格式
    Date date;
    try {
      date = sdf.parse(sdf.format(time));
      return sdf.format(date);
    } catch (ParseException e) {
      e.printStackTrace();
      return null;
    }
  }
}

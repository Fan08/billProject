package com.tang.bill.util;

import org.springframework.stereotype.Component;

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
}

package com.tang.bill;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.tang.bill.mapper.BillMapper;
import com.tang.bill.pojo.Bill;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class BillTest {

  @Autowired
  private BillMapper billMapper;

  @Test
  void testAdd() {
    Bill bill = new Bill();
    bill.setUuid("1");
    bill.setContent("1");
    bill.setAmount(12.2);
    bill.setType("1");

    int insert = billMapper.insert(bill);
    System.out.println(insert);
  }

  @Test
  void selectWithMonth() {
    Calendar cal = Calendar.getInstance();
    int firstDay = cal.getMinimum(Calendar.DATE);
    cal.set(Calendar.YEAR, 2019);
    cal.set(Calendar.MONTH, 10);
    cal.set(Calendar.DAY_OF_MONTH,firstDay);
    Date firstDate = cal.getTime();
    System.out.println(firstDate);

    Calendar cal2 = Calendar.getInstance();
    cal2.set(Calendar.MONTH, 11);
    int lastDay = cal2.getMinimum(Calendar.DATE);
    cal2.set(Calendar.DAY_OF_MONTH,lastDay);
    Date lastDate = cal2.getTime();
    System.out.println(lastDate);
    QueryWrapper wrapper = new QueryWrapper();
    wrapper.between("created_date", firstDate, lastDate);
    wrapper.like("creater", "c6825ed3afa9411694b62e61119544ed");
    List<Bill> bills = billMapper.selectBillWithWrapper(wrapper);
    for (Bill bill : bills) {
      System.out.println(bill.toString());
    }
  }

  @Test
  void selectTestWithSqlInXml() {
    List<Map> maps = billMapper.selectTestWithSqlInXml();
    for (Map map : maps) {
      System.out.println(map.toString());
    }
  }
}

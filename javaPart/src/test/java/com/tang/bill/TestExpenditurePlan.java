package com.tang.bill;

import com.tang.bill.mapper.BillMapper;
import com.tang.bill.mapper.ExpenditurePlanMapper;
import com.tang.bill.pojo.Bill;
import com.tang.bill.pojo.ExpenditurePlan;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;
import java.util.Map;

@SpringBootTest
class TestExpenditurePlan {
  @Autowired
  private ExpenditurePlanMapper expenditurePlanMapper;

  @Autowired
  private BillMapper billMapper;

  @Test
  void addExpenditurePlan() {
//    Bill bill = new Bill();
//    Date date = new Date();
//    bill.setUuid("1");
//    bill.setContent("1");
//    bill.setAmount(2.2);
//    bill.setType("1");
//    bill.setPlan("1");
//    bill.setCreater("1");
//    bill.setCreated_date(date);
//    bill.setUpdater("1");
//    bill.setUpdated_date(date);
//    bill.setBill_date(date);
//    billMapper.insert(bill);

    ExpenditurePlan expenditurePlan = new ExpenditurePlan();
    Date date = new Date();

    expenditurePlan.setUuid("2");
    expenditurePlan.setType("2");
    expenditurePlan.setContent("2");
    double a = 2.2;
    expenditurePlan.setAmount(a);
    expenditurePlan.setExpenditure_month(date);
    expenditurePlan.setCreater("2");
    expenditurePlan.setCreated_date(date);

    int insert = expenditurePlanMapper.insert(expenditurePlan);
    System.out.println(insert);
  }

  @Test
  void selectExpenditurePlanWithCreater() {
    List<Map> maps = expenditurePlanMapper.getExpenditurePlanByCreaterAndMonth("c6825ed3afa9411694b62e61119544ed", "2020-12");
    for (Map map : maps) {
      System.out.println(map);
    }
  }
}

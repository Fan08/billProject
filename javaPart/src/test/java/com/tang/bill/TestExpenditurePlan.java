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
  void testMapper() {
    List<Map> maps = billMapper.selectTestWithSqlInXml();
    for (Map map : maps) {
      System.out.println(map);
    }
  }
}

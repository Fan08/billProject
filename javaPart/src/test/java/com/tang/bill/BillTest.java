package com.tang.bill;

import com.tang.bill.mapper.BillMapper;
import com.tang.bill.pojo.Bill;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
}

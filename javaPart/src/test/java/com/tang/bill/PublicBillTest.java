package com.tang.bill;

import com.tang.bill.mapper.PublicBillTypeMapper;
import com.tang.bill.pojo.PublicBillType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.UUID;

@SpringBootTest
public class PublicBillTest {

  @Autowired
  private PublicBillTypeMapper publicBillTypeMapper;

  @Test
  void addTest() {
    String uuid = UUID.randomUUID().toString().replaceAll("-", "");
    Date date = new Date();

    PublicBillType billType = new PublicBillType();
    billType.setCreated_date(date);
    billType.setUuid(uuid);
    billType.setName("1");
    billType.setNature(1);
    billType.setIcon("11");

    publicBillTypeMapper.insert(billType);
  }
}

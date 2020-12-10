package com.tang.bill;

import com.tang.bill.mapper.BillTypeMapper;
import com.tang.bill.pojo.BillType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest
class BillTypeTest {

  @Autowired
  private BillTypeMapper billTypeMapper;

  @Test
  void testAddBillType() {
    String uuid = UUID.randomUUID().toString().replaceAll("-", "");
    Date date = new Date();

    BillType billType = new BillType();
    billType.setCreated_date(date);
    billType.setUuid(uuid);
    billType.setName("1");
    billType.setNature(1);
    billType.setIcon("11");

    billTypeMapper.insert(billType);
  }

  @Test
  void testDeleteBillType() {
    HashMap<String, Object> hashMap = new HashMap<>();
    hashMap.put("uuid", "79fe3a4a20cb48299a815097c8b889a7");
    int delete = billTypeMapper.deleteByMap(hashMap);
    System.out.println(delete);
  }
}

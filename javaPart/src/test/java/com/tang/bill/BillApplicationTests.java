package com.tang.bill;

import com.tang.bill.mapper.BillTypeMapper;
import com.tang.bill.mapper.UserMapper;
import com.tang.bill.pojo.BillType;
import com.tang.bill.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.xml.crypto.Data;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

@SpringBootTest
class BillApplicationTests {

  @Autowired
  private UserMapper userMapper;

  @Autowired
  private BillTypeMapper billTypeMapper;

  @Test
  void testAddUser() {
    int integer = userMapper.selectCount(null) + 1;
    String uuid = UUID.randomUUID().toString().replaceAll("-", "");
    Date date = new Date();

    User newUser = new User();
    newUser.setUuid(uuid);
    newUser.setAccount(Integer.toString(integer));
    newUser.setCreated_date(date);

    newUser.setPassword("1");
    newUser.setRole(1);
    newUser.setPhone("1");

    int result = userMapper.insert(newUser);
    System.out.println(result);
  }

  @Test
  void testGetUser() {
    HashMap<String, Object> hashMap = new HashMap<>();
    hashMap.put("uuid", "c6825ed3afa9411694b62e61119544ed");
    List<User> userList = userMapper.selectByMap(hashMap);
    User aimUser = userList.get(0);
    Date createdDate = aimUser.getCreated_date();
    SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String sd = sdf.format(new Date(Long.parseLong(String.valueOf(createdDate.getTime()))));
    System.out.println(sd);
  }

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
}

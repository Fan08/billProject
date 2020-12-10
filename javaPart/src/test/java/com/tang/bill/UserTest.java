package com.tang.bill;

import com.tang.bill.mapper.UserMapper;
import com.tang.bill.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@SpringBootTest
public class UserTest {

  @Autowired
  private UserMapper userMapper;

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
}
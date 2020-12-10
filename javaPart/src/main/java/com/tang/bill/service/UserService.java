package com.tang.bill.service;

import com.alibaba.fastjson.JSONObject;
import com.tang.bill.mapper.UserMapper;
import com.tang.bill.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

@RestController
public class UserService {

  @Autowired
  private UserMapper userMapper;

  @PostMapping("/addUser")
  public JSONObject addUser(@RequestBody Map map) {
    String password = (String) map.get("password");
    Integer role = (Integer) map.get("role");
    String phone = (String) map.get("password");
    String creater = (String) map.get("creater");

    int integer = userMapper.selectCount(null) + 1;
    String uuid = UUID.randomUUID().toString().replaceAll("-", "");
    Date date = new Date();

    User newUser = new User();

    // 由后台生成的字段
    newUser.setUuid(uuid);
    newUser.setAccount(Integer.toString(integer));
    newUser.setCreated_date(date);

    newUser.setPassword(password);
    newUser.setRole(role);
    newUser.setPhone(phone);
    newUser.setPhone(creater);

    userMapper.insert(newUser);

    JSONObject jsonObject = new JSONObject();
    jsonObject.put("account", integer);
    jsonObject.put("status", 200);
    return jsonObject;
  }
}

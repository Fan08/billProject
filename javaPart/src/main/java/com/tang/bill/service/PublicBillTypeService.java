package com.tang.bill.service;

import com.alibaba.fastjson.JSONObject;
import com.tang.bill.mapper.PublicBillTypeMapper;
import com.tang.bill.mapper.UserMapper;
import com.tang.bill.pojo.PublicBillType;
import com.tang.bill.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class PublicBillTypeService {

  @Autowired
  private PublicBillTypeMapper publicBillTypeMapper;

  @Autowired
  private UserMapper userMapper;

  @PostMapping("/addPublicBillType")
  public JSONObject addPublicBillType(@RequestBody Map map) {
    JSONObject result = new JSONObject();

    String name = (String) map.get("name");
    int nature = (int) map.get("nature");
    String icon = (String) map.get("icon");
    String creater = (String) map.get("creater");

    HashMap<String, Object> hashMap = new HashMap<>();
    hashMap.put("uuid", creater);
    List<User> users = userMapper.selectByMap(hashMap);

    if (users.size() == 0) {
      result.put("status", 500);
      result.put("warning", "未找到对应的用户");
      return result;
    }

    String uuid = UUID.randomUUID().toString().replaceAll("-", "");
    Date date = new Date();

    PublicBillType billType = new PublicBillType();
    billType.setCreated_date(date);
    billType.setUuid(uuid);
    billType.setName(name);
    billType.setNature(nature);
    billType.setIcon(icon);
    billType.setCreater(creater);

    int insertResult = publicBillTypeMapper.insert(billType);

    if (insertResult == 1) {
      result.put("status", 200);
    } else {
      result.put("status", 500);
      result.put("warning", "类型添加失败");
    }
    return result;
  }
}

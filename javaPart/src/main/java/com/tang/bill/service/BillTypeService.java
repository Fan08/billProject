package com.tang.bill.service;

import com.alibaba.fastjson.JSONObject;
import com.tang.bill.mapper.BillTypeMapper;
import com.tang.bill.mapper.UserMapper;
import com.tang.bill.pojo.BillType;
import com.tang.bill.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class BillTypeService {

  @Autowired
  private BillTypeMapper billTypeMapper;

  @Autowired
  private UserMapper userMapper;

  @PostMapping("/addBillType")
  public JSONObject addBillType(@RequestBody Map map) {
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

    BillType billType = new BillType();
    billType.setCreated_date(date);
    billType.setUuid(uuid);
    billType.setName(name);
    billType.setNature(nature);
    billType.setIcon(icon);
    billType.setCreater(creater);

    int insertResult = billTypeMapper.insert(billType);

    if (insertResult == 1) {
      result.put("status", 200);
    } else {
      result.put("status", 500);
      result.put("warning", "类型添加失败");
    }
    return result;
  }

  @PostMapping("/getBillTypesWithCreater")
  public JSONObject getBillTypesWithCreater(@RequestBody Map map) {
    // 创建人的 uuid
    String creater = (String) map.get("creater");

    HashMap<String, Object> hashMap = new HashMap<>();
    hashMap.put("creater", creater);
    List<BillType> billTypes = billTypeMapper.selectByMap(hashMap);

    JSONObject result = new JSONObject();
    result.put("billTypes", billTypes);
    return result;
  }

  public JSONObject deleteBillTypeWithUuid(@RequestBody Map map) {
    JSONObject result = new JSONObject();

    String uuid = (String) map.get("uuid");

    HashMap<String, Object> params = new HashMap<>();
    params.put("uuid", uuid);

    int deleteResult = billTypeMapper.deleteByMap(params);

    if (deleteResult == 1) {
      result.put("status", 200);
    } else {
      result.put("status", 500);
      result.put("warning", "删除失败");
    }

    return result;
  }
}

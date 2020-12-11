package com.tang.bill.service;

import com.alibaba.fastjson.JSONObject;
import com.tang.bill.mapper.BillMapper;
import com.tang.bill.mapper.UserMapper;
import com.tang.bill.pojo.Bill;
import com.tang.bill.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class BillService {

  @Autowired
  private BillMapper billMapper;

  @Autowired
  private UserMapper userMapper;

  @PostMapping("/addBill")
  public JSONObject addBill(@RequestBody Map map) {
    JSONObject result = new JSONObject();

    String content = (String) map.get("content");
    double amount = (double) map.get("amount");
    String type = (String) map.get("type");
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

    Bill bill = new Bill();
    bill.setUuid(uuid);
    bill.setContent(content);
    bill.setAmount(amount);
    bill.setType(type);
    bill.setCreated_date(date);
    bill.setCreater(creater);

    int insert = billMapper.insert(bill);

    if (insert == 1) {
      result.put("status", 200);
    } else {
      result.put("status", 500);
      result.put("warning", "添加记录失败");
    }

    return result;
  }

  @PostMapping("/deleteBill")
  public JSONObject deleteBill(@RequestBody Map map) {
    JSONObject result = new JSONObject();

    String uuid = (String) map.get("uuid");
    String creater = (String) map.get("creater");

    HashMap<String, Object> params = new HashMap<>();
    params.put("uuid", uuid);
    params.put("creater", creater);

    int delete = billMapper.deleteByMap(params);

    if (delete == 1) {
      result.put("status", 200);
    } else {
      result.put("status", 500);
      result.put("warning", "删除失败");
    }

    return result;
  }

  @PostMapping("/getBillWithCreater")
  public JSONObject getBillWithCreater(@RequestBody Map map) {
    JSONObject result = new JSONObject();

    String creater = (String) map.get("creater");

    HashMap<String, Object> params = new HashMap<>();
    params.put("creater", creater);

    List<Bill> bills = billMapper.selectByMap(params);

    result.put("status", 200);
    result.put("bills", bills);

    return result;
  }
}

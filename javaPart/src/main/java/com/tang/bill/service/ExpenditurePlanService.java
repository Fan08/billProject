package com.tang.bill.service;

import com.alibaba.fastjson.JSONObject;
import com.tang.bill.mapper.ExpenditurePlanMapper;
import com.tang.bill.mapper.UserMapper;
import com.tang.bill.pojo.ExpenditurePlan;
import com.tang.bill.pojo.User;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class ExpenditurePlanService {

  @Autowired
  private ExpenditurePlanMapper expenditurePlanMapper;

  @Autowired
  private UserMapper userMapper;

  @PostMapping("/addExpenditurePlan")
  public JSONObject addExpenditurePlan(@RequestBody Map map) throws ParseException {
    JSONObject result = new JSONObject();

    String uuid = UUID.randomUUID().toString().replaceAll("-", "");
    Date now = new Date();
    ExpenditurePlan expenditurePlan = new ExpenditurePlan();

    String type = (String) map.get("type");
    String content = (String) map.get("content");
    double amount = (double) map.get("amount");
    String expenditure_month = (String) map.get("expenditure_month");
    String creater = (String) map.get("creater");

    SimpleDateFormat sdf =  new SimpleDateFormat("yyyy-MM");
    Date date = sdf.parse(expenditure_month);
    date.setHours(8);

    if (this.selectUserWithUuid(creater) == 0) {
      result.put("status", 500);
      result.put("warning", "未找到对应的用户");
    } else {
      expenditurePlan.setUuid(uuid);
      expenditurePlan.setType(type);
      expenditurePlan.setContent(content);
      expenditurePlan.setAmount(amount);
      expenditurePlan.setExpenditure_month(date);
      expenditurePlan.setCreater(creater);
      expenditurePlan.setCreated_date(now);

      int insert = expenditurePlanMapper.insert(expenditurePlan);
      if (insert == 1) {
        result.put("status", 200);
      } else {
        result.put("status", 500);
        result.put("warning", "创建失败！");
      }
    }
    return result;
  }

  @PostMapping("/getExpenditurePlanByCreaterAndMonth")
  public JSONObject getExpenditurePlanByCreaterAndMonth(@RequestBody Map map) {
    JSONObject result = new JSONObject();

    String creater = (String) map.get("creater");
    String month = (String) map.get("month");
    List<Map> maps = expenditurePlanMapper.getExpenditurePlanByCreaterAndMonth(creater, month);

    result.put("status", 200);
    result.put("expenditurePlans", maps);
    return result;
  }

  @PostMapping("/deleteExpenditurePlanWithUuid")
  public JSONObject deleteExpenditurePlanWithUuid(@RequestBody Map map) {
    JSONObject result = new JSONObject();

    String uuid = (String) map.get("uuid");

    HashMap<String, Object> params = new HashMap<>();
    params.put("uuid", uuid);
    int deleteByMap = expenditurePlanMapper.deleteByMap(params);

    if (deleteByMap == 1) {
      result.put("status", 200);
    } else {
      result.put("status", 200);
      result.put("warning", "删除财政计划失败！");
    }
    return result;
  }

  private int selectUserWithUuid(String uuid) {
    HashMap<String, Object> hashMap = new HashMap<>();
    hashMap.put("uuid", uuid);
    List<User> users = userMapper.selectByMap(hashMap);
    return users.size();
  }
}

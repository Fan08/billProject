package com.tang.bill.service;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.tang.bill.mapper.BillMapper;
import com.tang.bill.mapper.UserMapper;
import com.tang.bill.pojo.Bill;
import com.tang.bill.pojo.User;
import com.tang.bill.util.CommonFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class BillService {

  @Autowired
  private BillMapper billMapper;

  @Autowired
  private UserMapper userMapper;

  @Autowired
  private CommonFunction commonFunction;

  @PostMapping("/addBill")
  public JSONObject addBill(@RequestBody Map map) throws ParseException {
    JSONObject result = new JSONObject();

    String content = (String) map.get("content");
    String amount = (String) map.get("amount");
    String type = (String) map.get("type");
    String creater = (String) map.get("creater");
    String selectedDate = (String) map.get("selectedDate");

    SimpleDateFormat sdf =  new SimpleDateFormat("yyyy/MM/dd");
    Date date = sdf.parse(selectedDate);

    if (this.selectUserWithUuid(creater) == 0) {
      result.put("status", 500);
      result.put("warning", "未找到对应的用户");
      return result;
    }

    Bill bill = new Bill();
    bill.setContent(content);
    bill.setAmount(Double.parseDouble(amount));
    bill.setType(type);
    bill.setCreater(creater);
    bill.setBill_date(date);

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

    Calendar cal = Calendar.getInstance();
    int year = cal.get(Calendar.YEAR);
    int month = cal.get(Calendar.MONTH);
    List bills = this.getBillsWithCreaterAndDate(year, month, creater);

    result.put("bills", bills);
    return result;
  }

  @PostMapping("/getBillWithCreaterAndMonth")
  public JSONObject getBillWithCreaterAndMonth(@RequestBody Map map) {
    JSONObject result = new JSONObject();

    String creater = (String) map.get("creater");
    String date = (String) map.get("date");

    String[] split = date.split("/");
    int year = Integer.parseInt(split[0]);
    int month = Integer.parseInt(split[1]) - 1;
    List bills = this.getBillsWithCreaterAndDate(year, month, creater);

    result.put("bills", bills);
    return result;
  }

  private List getBillsWithCreaterAndDate(int year, int month, String creater) {
    Date[] dates = commonFunction.generateStartDateAndEndDateOfMonth(year, month);

    QueryWrapper wrapper = new QueryWrapper();
    wrapper.between("bill_date", dates[0], dates[1]);
    wrapper.like("creater", creater);
    wrapper.orderByDesc("bill_date");
    List bills = billMapper.selectBillWithWrapper(wrapper);
    return bills;
  }

  private int selectUserWithUuid(String uuid) {
    HashMap<String, Object> hashMap = new HashMap<>();
    hashMap.put("uuid", uuid);
    List<User> users = userMapper.selectByMap(hashMap);
    return users.size();
  }
}

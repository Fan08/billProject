package com.tang.bill.service;

import com.alibaba.fastjson.JSONObject;
import com.tang.bill.mapper.BillTypeMapper;
import com.tang.bill.pojo.BillType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

@RestController
public class BillTypeService {

  @Autowired
  private BillTypeMapper billTypeMapper;

  @PostMapping("/addBillType")
  public JSONObject addBillType(@RequestBody Map map) {
    String name = (String) map.get("name");
    int nature = (int) map.get("nature");
    String icon = (String) map.get("icon");
    String creater = (String) map.get("creater");

    String uuid = UUID.randomUUID().toString().replaceAll("-", "");
    Date date = new Date();

    BillType billType = new BillType();
    billType.setCreated_date(date);
    billType.setUuid(uuid);
    billType.setName(name);
    billType.setNature(nature);
    billType.setIcon(icon);
    billType.setCreater(creater);

    billTypeMapper.insert(billType);

    JSONObject result = new JSONObject();
    result.put("status", 200);
    return result;
  }
}

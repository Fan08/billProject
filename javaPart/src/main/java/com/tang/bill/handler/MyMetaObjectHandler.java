package com.tang.bill.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component // 将处理器注入 IOC 容器
public class MyMetaObjectHandler implements MetaObjectHandler {
  // 插入时的填充策略
  @Override
  public void insertFill(MetaObject metaObject) {
    log.info("start insert fill ...");
    this.setFieldValByName("create_time", new Date(), metaObject);
    this.setFieldValByName("update_time", new Date(), metaObject);
  }

  // 更新时的填充策略
  @Override
  public void updateFill(MetaObject metaObject) {
    log.info("start update fill ...");
    this.setFieldValByName("update_time", new Date(), metaObject);
  }
}
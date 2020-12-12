package com.tang.bill.pojo;

import com.baomidou.mybatisplus.annotation.TableName;

import java.util.Date;

@TableName("single_bill")
public class Bill {
  private String uuid;
  private String content;
  private double amount;
  private String type;
  private String plan;
  private String creater;
  private Date created_date;
  private String updater;
  private Date updated_date;
  private Date bill_date;

  public Bill() {
  }

  public Bill(String uuid, String content, double amount, String type, String plan, String creater, Date created_date, String updater, Date updated_date, Date bill_date) {
    this.uuid = uuid;
    this.content = content;
    this.amount = amount;
    this.type = type;
    this.plan = plan;
    this.creater = creater;
    this.created_date = created_date;
    this.updater = updater;
    this.updated_date = updated_date;
    this.bill_date = bill_date;
  }

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public double getAmount() {
    return amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getPlan() {
    return plan;
  }

  public void setPlan(String plan) {
    this.plan = plan;
  }

  public String getCreater() {
    return creater;
  }

  public void setCreater(String creater) {
    this.creater = creater;
  }

  public Date getCreated_date() {
    return created_date;
  }

  public void setCreated_date(Date created_date) {
    this.created_date = created_date;
  }

  public String getUpdater() {
    return updater;
  }

  public void setUpdater(String updater) {
    this.updater = updater;
  }

  public Date getUpdated_date() {
    return updated_date;
  }

  public void setUpdated_date(Date updated_date) {
    this.updated_date = updated_date;
  }

  public Date getBill_date() {
    return bill_date;
  }

  public void setBill_date(Date bill_date) {
    this.bill_date = bill_date;
  }
}

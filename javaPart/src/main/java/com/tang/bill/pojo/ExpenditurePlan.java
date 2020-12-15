package com.tang.bill.pojo;

import java.util.Date;

public class ExpenditurePlan {
  private String uuid;
  private String type;
  private String content;
  private double amount;
  private Date expenditure_month;
  private String creater;
  private Date created_date;
  private String updater;
  private Date updated_date;

  public ExpenditurePlan() {
  }

  public ExpenditurePlan(String uuid, String type, String content, double amount, Date expenditure_month, String creater, Date created_date, String updater, Date updated_date) {
    this.uuid = uuid;
    this.type = type;
    this.content = content;
    this.amount = amount;
    this.expenditure_month = expenditure_month;
    this.creater = creater;
    this.created_date = created_date;
    this.updater = updater;
    this.updated_date = updated_date;
  }

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
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

  public Date getExpenditure_month() {
    return expenditure_month;
  }

  public void setExpenditure_month(Date expenditure_month) {
    this.expenditure_month = expenditure_month;
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

  @Override
  public String toString() {
    return "ExpenditurePlan{" +
            "uuid='" + uuid + '\'' +
            ", type='" + type + '\'' +
            ", content='" + content + '\'' +
            ", amount=" + amount +
            ", expenditure_month=" + expenditure_month +
            ", creater='" + creater + '\'' +
            ", created_date=" + created_date +
            ", updater='" + updater + '\'' +
            ", updated_date=" + updated_date +
            '}';
  }
}

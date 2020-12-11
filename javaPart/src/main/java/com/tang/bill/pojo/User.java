package com.tang.bill.pojo;

import java.util.Date;
import com.baomidou.mybatisplus.annotation.*;

@TableName("user_management")
public class User {
  private String uuid;
  private String account;
  private String password;
  private Integer role;
  private String phone;
  private String creater;
  @TableField(fill = FieldFill.INSERT)
  private Date created_date;
  private String updater;
  @TableField(fill = FieldFill.INSERT_UPDATE)
  private Date updated_date;

  public User() {
  }

  public User(String uuid, String account, String password, Integer role, String phone, String creater, Date created_date, String updater, Date updated_date) {
    this.uuid = uuid;
    this.account = account;
    this.password = password;
    this.role = role;
    this.phone = phone;
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

  public String getAccount() {
    return account;
  }

  public void setAccount(String account) {
    this.account = account;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Integer getRole() {
    return role;
  }

  public void setRole(Integer role) {
    this.role = role;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
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
    return "User{" +
            "uuid='" + uuid + '\'' +
            ", account='" + account + '\'' +
            ", password='" + password + '\'' +
            ", role=" + role +
            ", phone='" + phone + '\'' +
            ", creater='" + creater + '\'' +
            ", created_date=" + created_date +
            ", updater='" + updater + '\'' +
            ", updated_date=" + updated_date +
            '}';
  }
}

package com.tang.bill.pojo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;

import java.util.Date;

public class BillType {
  @TableField(fill = FieldFill.INSERT)
  private String uuid;
  private String name;
  private int nature;
  private String icon;
  private String type_creater;
  @TableField(fill = FieldFill.INSERT)
  private Date created_date;
  private String updater;
  @TableField(fill = FieldFill.INSERT_UPDATE)
  private Date updated_date;

  public BillType() {
  }

  public BillType(String uuid, String name, int nature, String icon, String type_creater, Date created_date, String updater, Date updated_date) {
    this.uuid = uuid;
    this.name = name;
    this.nature = nature;
    this.icon = icon;
    this.type_creater = type_creater;
    this.created_date = created_date;
    this.updater = updater;
    this.updated_date = updated_date;
  }

  @Override
  public String toString() {
    return "BillType{" +
            "uuid='" + uuid + '\'' +
            ", name='" + name + '\'' +
            ", nature=" + nature +
            ", icon='" + icon + '\'' +
            ", type_creater='" + type_creater + '\'' +
            ", created_date=" + created_date +
            ", updater='" + updater + '\'' +
            ", updated_date=" + updated_date +
            '}';
  }

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getNature() {
    return nature;
  }

  public void setNature(int nature) {
    this.nature = nature;
  }

  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }

  public String getType_creater() {
    return type_creater;
  }

  public void setType_creater(String type_creater) {
    this.type_creater = type_creater;
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
}

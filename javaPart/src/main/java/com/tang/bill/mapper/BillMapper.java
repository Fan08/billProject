package com.tang.bill.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.tang.bill.pojo.Bill;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface BillMapper extends BaseMapper<Bill> {
  // 自定义 sql 语句
  @Select("select single_bill.*, bill_type.nature from single_bill left join bill_type on bill_type.uuid=single_bill.type ${ew.customSqlSegment}")
  List<Map> selectBillWithWrapper(@Param(Constants.WRAPPER) Wrapper<Map> billWrapper);

  List<Map> selectTestWithSqlInXml();
}

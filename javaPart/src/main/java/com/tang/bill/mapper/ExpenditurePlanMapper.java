package com.tang.bill.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tang.bill.pojo.ExpenditurePlan;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ExpenditurePlanMapper extends BaseMapper<ExpenditurePlan> {
  List<Map> getExpenditurePlanByCreaterAndMonth(@Param("creater") String creater, @Param("month") String month);
}

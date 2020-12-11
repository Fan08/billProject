package com.tang.bill.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tang.bill.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper extends BaseMapper<User> {

  // 自定义 sql 语句
  @Select("SELECT * FROM user_management where uuid = #{uuid}")
  List<User> selectUserByOwnMethod(@Param("uuid") String uuid);
}

/*
 Navicat Premium Data Transfer

 Source Server         : local_root
 Source Server Type    : MySQL
 Source Server Version : 100234
 Source Host           : localhost:3306
 Source Schema         : mktm

 Target Server Type    : MySQL
 Target Server Version : 100234
 File Encoding         : 65001

 Date: 29/04/2021 00:49:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comb_box_item
-- ----------------------------
DROP TABLE IF EXISTS `comb_box_item`;
CREATE TABLE `comb_box_item`  (
  `box_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `box_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '代码',
  `box_key` int NOT NULL AUTO_INCREMENT COMMENT '下拉值',
  `box_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '下拉显示文字',
  `sort` int NULL DEFAULT NULL COMMENT '排序号',
  `box_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '下拉类型',
  PRIMARY KEY (`box_key`, `box_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comb_box_item
-- ----------------------------
INSERT INTO `comb_box_item` VALUES ('10001', NULL, 1, '古井贡酒', 1, 'brandName');
INSERT INTO `comb_box_item` VALUES ('10002', NULL, 2, '汾酒', 2, 'brandName');
INSERT INTO `comb_box_item` VALUES ('10003', NULL, 3, '谢裕大', 3, 'brandName');
INSERT INTO `comb_box_item` VALUES ('10004', NULL, 4, '其他品牌', 999, 'brandName');
INSERT INTO `comb_box_item` VALUES ('10005', 'fullPayment', 5, '全款', 1, 'payType');
INSERT INTO `comb_box_item` VALUES ('10006', 'installment', 6, '分期付款', 2, 'payType');
INSERT INTO `comb_box_item` VALUES ('10007', 'JD', 7, '京东', 1, 'platform');
INSERT INTO `comb_box_item` VALUES ('10008', 'TB', 8, '淘宝', 2, 'platform');
INSERT INTO `comb_box_item` VALUES ('10009', 'SN', 9, '苏宁易购', 3, 'platform');
INSERT INTO `comb_box_item` VALUES ('10010', '12306', 10, '铁路12306', 4, 'platform');
INSERT INTO `comb_box_item` VALUES ('10011', '12308', 11, '巴士管家', 5, 'platform');
INSERT INTO `comb_box_item` VALUES ('10012', 'ZFB', 12, '支付宝（余额）', 1, 'payWay');
INSERT INTO `comb_box_item` VALUES ('10013', 'WX', 13, '微信（余额）', 2, 'payWay');
INSERT INTO `comb_box_item` VALUES ('10014', 'ZS_BANK_ZFB', 14, '招商信用卡', 3, 'payWay');
INSERT INTO `comb_box_item` VALUES ('10015', 'YC_BANK_WX', 15, '邮储信用卡', 4, 'payWay');
INSERT INTO `comb_box_item` VALUES ('10016', 'ZS_BANK', 16, '招商借记卡', 5, 'payWay');

-- ----------------------------
-- Table structure for su_product
-- ----------------------------
DROP TABLE IF EXISTS `su_product`;
CREATE TABLE `su_product`  (
  `product_id` int NOT NULL AUTO_INCREMENT COMMENT '商品的主键ID',
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '商品名称',
  `follow_time` datetime(0) NOT NULL COMMENT '初始关注时间',
  `expect_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '预期价格',
  `start_price` decimal(10, 2) NOT NULL COMMENT '初始关注的价格',
  `product_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '1' COMMENT '商品类型',
  `brand_type` int NULL DEFAULT NULL COMMENT '品牌',
  `useage` int NULL DEFAULT NULL COMMENT '用处，购买，销售',
  `five_level` int NULL DEFAULT NULL COMMENT '商品打星',
  `reference` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '推荐人',
  `product_die` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品特征描述',
  `is_visible` int NOT NULL DEFAULT 1 COMMENT '是否可视',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of su_product
-- ----------------------------
INSERT INTO `su_product` VALUES (1, '古井贡酒5', '2021-03-20 01:24:43', 120.00, 158.00, '1', 1, NULL, NULL, '王凯', NULL, 1);
INSERT INTO `su_product` VALUES (2, '古井贡酒8', '2021-03-20 01:24:43', 120.00, 323.20, '1', 1, NULL, NULL, '王凯', NULL, 1);
INSERT INTO `su_product` VALUES (3, '汾酒黄盖玻汾', '2021-03-15 12:24:43', 240.00, 268.00, '1', 2, NULL, NULL, '李强', NULL, 1);
INSERT INTO `su_product` VALUES (8, '汾酒金奖20', '2021-03-25 22:55:56', 368.00, 320.00, '1', 2, NULL, 5, '李强', '汾酒金奖20，中高端烈酒', 1);
INSERT INTO `su_product` VALUES (10, '祁门功夫红茶300g', '2021-03-25 23:16:39', 220.00, 268.00, '1', 3, NULL, 5, '李强', '红茶，入口润滑，极品，300g，2罐装', 1);
INSERT INTO `su_product` VALUES (11, '组合可加长餐桌', '2021-03-31 21:38:45', 1200.00, 1490.00, '1', 999, NULL, 3, '朱波', '京东 小厅宽居家旗舰店 正方形钢化玻璃餐桌 单桌', 1);

-- ----------------------------
-- Table structure for su_user
-- ----------------------------
DROP TABLE IF EXISTS `su_user`;
CREATE TABLE `su_user`  (
  `user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户ID',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户名',
  `real_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '真实姓名/店名/企业',
  `age` int NULL DEFAULT NULL COMMENT '年龄',
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '性别，F或M男',
  `last_login_time` datetime(0) NULL DEFAULT NULL COMMENT '最近一次登录时间',
  `is_active` int NOT NULL DEFAULT 1 COMMENT '是否启用',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of su_user
-- ----------------------------
INSERT INTO `su_user` VALUES ('admin', 'zhubo', '朱波', 29, 'M', '2021-04-26 22:13:06', 1);
INSERT INTO `su_user` VALUES ('JDZY', NULL, '京东自营', NULL, NULL, '2021-04-26 22:58:47', 1);

-- ----------------------------
-- Table structure for trade_common
-- ----------------------------
DROP TABLE IF EXISTS `trade_common`;
CREATE TABLE `trade_common`  (
  `deal_no` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '交易单号',
  `product_id` int NULL DEFAULT NULL COMMENT '商品ID',
  `seller` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '卖方',
  `buyer` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '买方',
  `pay_way` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '支付方式',
  `pay_type` int NULL DEFAULT NULL COMMENT '全额付款，分期付款',
  `product_num` int NULL DEFAULT NULL COMMENT '商品数量',
  `product_price` decimal(12, 2) NULL DEFAULT NULL COMMENT '商品单价',
  `total_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '总价',
  `platform_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '购买平台',
  `discount_die` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '优惠描述',
  `feature_die` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'DIE 描述、解释、评价 Description, Interpretation, Evaluation',
  `record_time` datetime(0) NULL DEFAULT NULL COMMENT '记录时间',
  `picture_one` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '图片1',
  `picture_two` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '图片1',
  `picture_three` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '图片1',
  `is_valid_data` int NULL DEFAULT NULL COMMENT '是否是有效的数据，1是有效',
  PRIMARY KEY (`deal_no`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of trade_common
-- ----------------------------
INSERT INTO `trade_common` VALUES ('TC20210426230600', 1, 'JDZY', 'admin', 'ZS_BANK', 1, 1, 262.00, 141.85, 'JD', '1', '1', '2021-04-19 21:41:04', NULL, NULL, NULL, 1);

SET FOREIGN_KEY_CHECKS = 1;

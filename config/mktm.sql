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

 Date: 15/07/2021 06:50:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comb_box_item
-- ----------------------------
DROP TABLE IF EXISTS `comb_box_item`;
CREATE TABLE `comb_box_item`  (
  `box_id` int NOT NULL AUTO_INCREMENT,
  `box_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '代码',
  `box_key` int NOT NULL COMMENT '下拉值',
  `box_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '下拉显示文字',
  `sort` int NULL DEFAULT NULL COMMENT '排序号',
  `box_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '下拉类型',
  PRIMARY KEY (`box_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10023 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comb_box_item
-- ----------------------------
INSERT INTO `comb_box_item` VALUES (10001, 'GJGJ_Wine', 1, '古井贡酒', 1, 'brandName');
INSERT INTO `comb_box_item` VALUES (10002, 'FJ_Wine', 2, '汾酒', 2, 'brandName');
INSERT INTO `comb_box_item` VALUES (10003, 'XieDaYu_Tea', 3, '谢裕大', 3, 'brandName');
INSERT INTO `comb_box_item` VALUES (10005, 'fullPayment', 5, '全款', 1, 'payType');
INSERT INTO `comb_box_item` VALUES (10006, 'installment', 6, '分期付款', 2, 'payType');
INSERT INTO `comb_box_item` VALUES (10007, 'JD', 1, '京东', 1, 'platform');
INSERT INTO `comb_box_item` VALUES (10008, 'TB', 2, '淘宝', 2, 'platform');
INSERT INTO `comb_box_item` VALUES (10009, 'SN', 3, '苏宁易购', 3, 'platform');
INSERT INTO `comb_box_item` VALUES (10010, '12306', 4, '铁路12306', 4, 'platform');
INSERT INTO `comb_box_item` VALUES (10011, '12308', 5, '巴士管家', 5, 'platform');
INSERT INTO `comb_box_item` VALUES (10012, 'ZFB', 12, '支付宝（余额）', 1, 'payWay');
INSERT INTO `comb_box_item` VALUES (10013, 'WX', 13, '微信（余额）', 2, 'payWay');
INSERT INTO `comb_box_item` VALUES (10014, 'ZS_BANK_ZFB', 14, '招商信用卡', 3, 'payWay');
INSERT INTO `comb_box_item` VALUES (10015, 'YC_BANK_WX', 15, '邮储信用卡', 4, 'payWay');
INSERT INTO `comb_box_item` VALUES (10016, 'ZS_BANK', 16, '招商借记卡', 5, 'payWay');
INSERT INTO `comb_box_item` VALUES (10017, 'MDY_gardening', 4, '墨斗鱼园艺', 4, 'brandName');
INSERT INTO `comb_box_item` VALUES (10018, 'JYS_gardening', 5, '九月生园艺', 5, 'brandName');
INSERT INTO `comb_box_item` VALUES (10019, 'JD_BT', 17, '京东白条', 3, 'payWay');
INSERT INTO `comb_box_item` VALUES (10020, 'no_brand', 6, '杂牌', 6, 'brandName');
INSERT INTO `comb_box_item` VALUES (10021, 'IKEA', 7, '宜家', 7, 'brandName');
INSERT INTO `comb_box_item` VALUES (10022, 'XY', 6, '闲鱼', 6, 'platform');

-- ----------------------------
-- Table structure for comb_box_item_copy1
-- ----------------------------
DROP TABLE IF EXISTS `comb_box_item_copy1`;
CREATE TABLE `comb_box_item_copy1`  (
  `box_id` int NOT NULL,
  `box_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '代码',
  `box_key` int NOT NULL AUTO_INCREMENT COMMENT '下拉值',
  `box_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '下拉显示文字',
  `sort` int NULL DEFAULT NULL COMMENT '排序号',
  `box_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '下拉类型',
  PRIMARY KEY (`box_key`, `box_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1000 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comb_box_item_copy1
-- ----------------------------
INSERT INTO `comb_box_item_copy1` VALUES (10001, 'GJGJ_Wine', 1, '古井贡酒', 1, 'brandName');
INSERT INTO `comb_box_item_copy1` VALUES (10002, 'FJ_Wine', 2, '汾酒', 2, 'brandName');
INSERT INTO `comb_box_item_copy1` VALUES (10003, 'XieDaYu_Tea', 3, '谢裕大', 3, 'brandName');
INSERT INTO `comb_box_item_copy1` VALUES (10017, 'MDY_gardening', 4, '墨斗鱼园艺', 4, 'brandName');
INSERT INTO `comb_box_item_copy1` VALUES (10005, 'fullPayment', 5, '全款', 1, 'payType');
INSERT INTO `comb_box_item_copy1` VALUES (10018, NULL, 5, '九月生园艺', 5, 'brandName');
INSERT INTO `comb_box_item_copy1` VALUES (10006, 'installment', 6, '分期付款', 2, 'payType');
INSERT INTO `comb_box_item_copy1` VALUES (10007, 'JD', 7, '京东', 1, 'platform');
INSERT INTO `comb_box_item_copy1` VALUES (10008, 'TB', 8, '淘宝', 2, 'platform');
INSERT INTO `comb_box_item_copy1` VALUES (10009, 'SN', 9, '苏宁易购', 3, 'platform');
INSERT INTO `comb_box_item_copy1` VALUES (10010, '12306', 10, '铁路12306', 4, 'platform');
INSERT INTO `comb_box_item_copy1` VALUES (10011, '12308', 11, '巴士管家', 5, 'platform');
INSERT INTO `comb_box_item_copy1` VALUES (10012, 'ZFB', 12, '支付宝（余额）', 1, 'payWay');
INSERT INTO `comb_box_item_copy1` VALUES (10013, 'WX', 13, '微信（余额）', 2, 'payWay');
INSERT INTO `comb_box_item_copy1` VALUES (10014, 'ZS_BANK_ZFB', 14, '招商信用卡', 3, 'payWay');
INSERT INTO `comb_box_item_copy1` VALUES (10015, 'YC_BANK_WX', 15, '邮储信用卡', 4, 'payWay');
INSERT INTO `comb_box_item_copy1` VALUES (10016, 'ZS_BANK', 16, '招商借记卡', 5, 'payWay');
INSERT INTO `comb_box_item_copy1` VALUES (10999, NULL, 999, '其他品牌', 999, 'brandName');

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
  `brand_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '品牌',
  `useage` int NULL DEFAULT NULL COMMENT '用处，购买，销售',
  `five_level` int NULL DEFAULT NULL COMMENT '商品打星',
  `reference` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '推荐人',
  `product_die` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品特征描述',
  `is_visible` int NOT NULL DEFAULT 1 COMMENT '是否可视',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of su_product
-- ----------------------------
INSERT INTO `su_product` VALUES (1, '古井贡酒5', '2021-03-19 17:24:43', 120.00, 158.00, '1', 'GJGJ_Wine', NULL, 3, '王凯', '酒质偏甜', 1);
INSERT INTO `su_product` VALUES (13, '种菜盆', '2021-05-29 12:03:57', 27.00, 47.40, '1', 'JYS_gardening', NULL, 3, '朱波', '加厚3件装', 1);
INSERT INTO `su_product` VALUES (14, '3L营养土', '2021-05-10 20:10:42', 5.00, 9.90, '1', 'MDY_gardening', NULL, 5, '朱波', '3L营养土，能中大中小盆号的3盆花', 1);
INSERT INTO `su_product` VALUES (15, '莫兰迪陶瓷大中小花盆', '2021-05-10 14:09:05', 35.80, 55.80, '1', 'MDY_gardening', NULL, 5, '朱波', '陶瓷材质，品质优良，但价格偏高', 1);
INSERT INTO `su_product` VALUES (16, '汾酒封坛15老白汾53度单瓶', '2021-05-06 22:13:39', 158.00, 198.00, '1', 'FJ_Wine', NULL, 5, '朱波', '第一次入门的酒，品质优良，价格偏高，适合关注活动价后购买', 1);
INSERT INTO `su_product` VALUES (17, '大号仿陶瓷花盆', '2021-05-27 14:57:10', 12.78, 14.50, '1', 'no_brand', NULL, 4, '李强', '淘宝店铺：沃美施园艺用品；性价比高；8号大小；2只装；矮款', 1);
INSERT INTO `su_product` VALUES (18, '提赛尔1米5床架', '2021-05-22 15:07:43', 2000.00, 2499.00, '1', 'IKEA', NULL, 4, '朱波', '宜家床架', 1);
INSERT INTO `su_product` VALUES (19, '琴叶榕', '2021-07-03 05:21:24', 6.00, 12.00, '1', 'no_brand', NULL, 3, '朱波', '京东店铺：韵沃迷之卉专卖店；1棵不含盆', 1);
INSERT INTO `su_product` VALUES (20, '富贵竹', '2021-07-03 13:24:35', 6.00, 12.00, '1', 'no_brand', NULL, 5, '朱波', '1盆4棵赠两包土，京东自营', 1);

-- ----------------------------
-- Table structure for su_user
-- ----------------------------
DROP TABLE IF EXISTS `su_user`;
CREATE TABLE `su_user`  (
  `user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户ID',
  `en_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户名',
  `full_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '真实姓名/店名/企业',
  `age` int NULL DEFAULT NULL COMMENT '年龄',
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '性别，F或M男',
  `last_login_time` datetime(0) NULL DEFAULT NULL COMMENT '最近一次登录时间',
  `is_active` int NOT NULL DEFAULT 1 COMMENT '是否启用',
  `buyer_or_seller` int NOT NULL DEFAULT 3 COMMENT '买卖3，卖家2、买家1、',
  `platform_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of su_user
-- ----------------------------
INSERT INTO `su_user` VALUES ('admin', 'zhubo', '朱波', 29, 'M', '2021-04-26 22:13:06', 1, 3, NULL);
INSERT INTO `su_user` VALUES ('JDZY', '京东自营', '京东自营', 18, 'M', '2021-04-26 22:58:47', 1, 2, 'JD');
INSERT INTO `su_user` VALUES ('TB_WMSYYYP', '沃美施园艺用品', '沃美施园艺用品', NULL, NULL, NULL, 1, 2, 'JD');
INSERT INTO `su_user` VALUES ('XianYu_Seller', '闲鱼卖家', '闲鱼卖家', 10, 'M', NULL, 1, 3, 'TB');

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
INSERT INTO `trade_common` VALUES ('TC20210530120838', 13, 'JDZY', 'admin', 'JD_BT', NULL, 3, 49.90, 37.54, 'JD', '京东5元运费券， 1.36京东活动红包，800京豆，商品优惠3元', NULL, '2021-05-29 04:06:14', NULL, NULL, NULL, 1);
INSERT INTO `trade_common` VALUES ('TC20210530140803', 14, 'JDZY', 'admin', 'JD_BT', NULL, 1, 9.90, 5.73, 'JD', '运费券6元；商品优惠3元；支付有礼1元；京东活动红包0.17', NULL, '2021-05-11 06:06:51', NULL, NULL, NULL, 1);
INSERT INTO `trade_common` VALUES ('TC20210530141149', 15, 'JDZY', 'admin', 'YC_BANK_WX', NULL, 1, 55.80, 15.50, 'JD', '邮政信用卡30元支付券；京东会员运费券；京豆1000个；京东活动红包0.3元', NULL, '2021-05-03 22:10:35', NULL, NULL, NULL, 1);
INSERT INTO `trade_common` VALUES ('TC20210530150349', 17, 'TB_WMSYYYP', 'admin', 'YC_BANK_WX', NULL, 1, 14.50, 12.78, 'TB', '淘金币0.72，其他优惠1元', NULL, '2021-05-27 15:00:29', NULL, NULL, NULL, 1);
INSERT INTO `trade_common` VALUES ('TC20210530161926', 18, 'XianYu_Seller', 'admin', 'ZS_BANK', NULL, 1, 2500.00, 1000.00, 'XY', '提赛尔1.5米床架，加两个床头柜，闲鱼购买，货拉拉143元', NULL, '2021-05-22 16:17:46', NULL, NULL, NULL, 1);
INSERT INTO `trade_common` VALUES ('TC20210703132317', 19, 'JDZY', 'admin', 'JD_BT', NULL, 1, 12.00, 6.25, 'JD', '京豆', NULL, '2021-07-03 13:22:07', NULL, NULL, NULL, 1);
INSERT INTO `trade_common` VALUES ('TC20210703132700', 20, 'JDZY', 'admin', 'JD_BT', NULL, 1, 12.00, 6.00, 'JD', '1000京豆', NULL, '2021-07-03 13:26:16', NULL, NULL, NULL, 1);

-- ----------------------------
-- Table structure for trade_market
-- ----------------------------
DROP TABLE IF EXISTS `trade_market`;
CREATE TABLE `trade_market`  (
  `id` int NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `product_cost` decimal(65, 0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of trade_market
-- ----------------------------

-- ----------------------------
-- Table structure for tt_brand
-- ----------------------------
DROP TABLE IF EXISTS `tt_brand`;
CREATE TABLE `tt_brand`  (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `brand_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sort` int NULL DEFAULT NULL,
  PRIMARY KEY (`brand_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tt_brand
-- ----------------------------
INSERT INTO `tt_brand` VALUES (1, 'GJGJ_Wine', '古井贡酒', 1);
INSERT INTO `tt_brand` VALUES (2, 'FJ_Wine', '汾酒', 2);
INSERT INTO `tt_brand` VALUES (3, 'China_Mobile', '中国移动', 3);
INSERT INTO `tt_brand` VALUES (4, 'Panasonic', '松下', 4);
INSERT INTO `tt_brand` VALUES (5, 'MDY_gardening', '墨斗鱼园艺', 5);
INSERT INTO `tt_brand` VALUES (6, 'JYS_gardening', '九月生园艺', 6);
INSERT INTO `tt_brand` VALUES (7, 'XieDaYu_Tea', '谢裕大', 7);

SET FOREIGN_KEY_CHECKS = 1;

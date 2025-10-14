
/**
 * 友链类型（数字枚举，适合数据库存储）
 */
export enum WeblinkType {
  Default = 0,
  Blog = 1,
  Tech = 2,
  News = 3,
  Media = 4,
  ECommerce = 5,
  Social = 6,
  Tools = 7,
  Other = 8
}

/**
 * 友链配置接口
 */
export interface WeblinkConfig {
  url: string;
  shortName: string;
  desc: string;
  logo: string;
  type?: WeblinkType;
}

// 可选：类型标签映射
export const WeblinkTypeLabel: Record<WeblinkType, string> = {
  [WeblinkType.Default]: '默认',
  [WeblinkType.Blog]: '个人博客',
  [WeblinkType.Tech]: '技术网站',
  [WeblinkType.News]: '新闻资讯',
  [WeblinkType.Media]: '视频音乐',
  [WeblinkType.ECommerce]: '购物电商',
  [WeblinkType.Social]: '社交社区',
  [WeblinkType.Tools]: '工具资源',
  [WeblinkType.Other]: '其他'
};
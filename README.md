# 记忆力训练APP

## 项目简介
这是一个专为老年人和年轻人设计的记忆力训练APP，提供个性化的训练方案和游戏化体验。

## 主要功能

### 老年人模式
- **简单记忆游戏**：数字记忆、图片配对、词语回忆
- **渐进式难度**：从简单开始，逐步增加挑战
- **大字体界面**：适合老年人阅读
- **语音提示**：提供语音指导
- **慢节奏设计**：给予充足的反应时间

### 年轻人模式
- **复杂记忆挑战**：多任务记忆、快速反应、模式识别
- **竞技元素**：排行榜、成就系统、挑战模式
- **多样化游戏**：数字序列、图像记忆、逻辑推理
- **数据分析**：详细的进步报告和统计

## 技术栈
- React Native (跨平台移动应用)
- Expo (快速开发框架)
- AsyncStorage (本地数据存储)
- React Navigation (页面导航)

## 安装和运行
```bash
npm install
npx expo start
```

## 项目结构
```
src/
├── components/     # 可复用组件
├── screens/        # 页面组件
├── games/          # 游戏逻辑
├── utils/          # 工具函数
├── constants/      # 常量定义
└── assets/         # 静态资源
``` 

## 推荐的云端数据库方案

### 1. Firebase Firestore（最推荐）
**优势：**
- 与React Native/Expo完美集成
- 实时数据同步
- 内置用户认证系统
- 免费额度充足
- 易于使用

**配置步骤：**
```bash
<code_block_to_apply_changes_from>
```

### 2. Supabase（开源Firebase替代品）
**优势：**
- 完全开源
- PostgreSQL数据库
- 内置认证和实时功能
- 免费额度大
- 支持SQL查询

### 3. AWS Amplify
**优势：**
- 企业级服务
- 功能全面
- 可扩展性强

## 我推荐使用Firebase Firestore

让我为您创建一个完整的Firebase配置：

### 1. 创建Firebase项目
1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 创建新项目
3. 启用Authentication和Firestore Database

### 2. 安装依赖
```bash
npm install firebase @react-native-async-storage/async-storage
```

### 3. Firebase配置文件

``` # memory-training-app-Rachel

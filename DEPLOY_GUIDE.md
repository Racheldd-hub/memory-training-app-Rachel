# 记忆力训练网页版快速部署指南

## 🚀 一键部署到GitHub Pages

### 步骤1: 创建GitHub仓库
1. 访问 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`memory-training-app`
4. 描述：`记忆力训练APP - 专为老年人和年轻人设计`
5. 选择 "Public"
6. **不要**勾选 "Add a README file"
7. 点击 "Create repository"

### 步骤2: 推送代码到GitHub
```bash
# 添加远程仓库（替换your-username为您的GitHub用户名）
git remote add origin https://github.com/your-username/memory-training-app.git

# 推送代码
git push -u origin main
```

### 步骤3: 启用GitHub Pages
1. 在GitHub仓库页面，点击 "Settings"
2. 左侧菜单找到 "Pages"
3. Source选择 "GitHub Actions"
4. 等待自动部署完成

### 步骤4: 访问您的网站
部署完成后，访问：
`https://your-username.github.io/memory-training-app/`

## 📱 功能预览

### 主要功能
- ✅ 用户注册和登录
- ✅ 老年人模式（简单易学）
- ✅ 年轻人模式（挑战性强）
- ✅ 数字记忆游戏
- ✅ 图片配对游戏
- ✅ 词语回忆游戏
- ✅ 统计和进度跟踪
- ✅ 成就系统
- ✅ 响应式设计

### 游戏类型
1. **数字记忆** - 记住数字序列
2. **图片配对** - 找到相同的图片
3. **词语回忆** - 记住词语列表
4. **颜色记忆** - 记住颜色序列
5. **序列记忆** - 记住复杂序列
6. **模式识别** - 识别隐藏模式

## 🎯 测试账号

您可以使用以下测试账号：
- 邮箱：`demo@memorytraining.com`
- 密码：`demo123`

或者直接注册新账号。

## 📊 部署状态

- **自动部署**: ✅ 已配置
- **GitHub Actions**: ✅ 已启用
- **移动端适配**: ✅ 已优化
- **浏览器兼容**: ✅ Chrome, Firefox, Safari, Edge

## 🔧 自定义配置

### 修改网站标题
编辑 `web/index.html` 中的 `<title>` 标签

### 修改主题颜色
编辑 `web/styles.css` 中的颜色变量

### 添加新游戏
在 `web/app.js` 中添加游戏逻辑

## 📞 技术支持

如果遇到问题：
1. 检查GitHub Actions日志
2. 查看浏览器控制台错误
3. 提交GitHub Issue
4. 联系技术支持

## 🎉 部署成功

恭喜！您的记忆力训练网页版已成功部署。

现在可以：
- 分享链接给朋友
- 在社交媒体上推广
- 收集用户反馈
- 继续开发新功能

---

**立即体验**: https://your-username.github.io/memory-training-app/ 
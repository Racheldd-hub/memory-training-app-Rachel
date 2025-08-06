#!/bin/bash

echo "🚀 部署记忆力训练网页版到GitHub Pages..."

# 检查Git状态
if [ ! -d ".git" ]; then
    echo "❌ 错误: 当前目录不是Git仓库"
    echo "请先初始化Git仓库: git init"
    exit 1
fi

# 检查web目录
if [ ! -d "web" ]; then
    echo "❌ 错误: 未找到web目录"
    exit 1
fi

# 创建gh-pages分支
echo "📦 创建gh-pages分支..."
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# 清空分支内容
echo "🧹 清空分支内容..."
git rm -rf . || true

# 复制web文件
echo "📁 复制web文件..."
cp -r web/* .

# 添加文件
echo "➕ 添加文件到Git..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "Deploy web version $(date '+%Y-%m-%d %H:%M:%S')" || true

# 推送到远程
echo "🚀 推送到GitHub..."
git push origin gh-pages --force

echo "✅ 部署完成！"
echo ""
echo "🌐 您的网页将在几分钟后可用："
echo "   https://your-username.github.io/your-repo-name/"
echo ""
echo "💡 提示：请将your-username和your-repo-name替换为实际值" 
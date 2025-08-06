#!/bin/bash

echo "🚀 开始设置记忆力训练APP项目..."

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到Node.js，请先安装Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到npm，请先安装npm"
    exit 1
fi

echo "✅ Node.js版本: $(node --version)"
echo "✅ npm版本: $(npm --version)"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ 依赖安装成功！"
else
    echo "❌ 依赖安装失败，请检查网络连接或重试"
    exit 1
fi

# 检查Expo CLI
if ! command -v expo &> /dev/null; then
    echo "📦 安装Expo CLI..."
    npm install -g @expo/cli
fi

echo "🎉 项目设置完成！"
echo ""
echo "📱 运行以下命令启动应用："
echo "   npm start"
echo ""
echo "📱 或者使用Expo CLI："
echo "   npx expo start"
echo ""
echo "📱 在手机上安装Expo Go应用来测试APP" 
#!/bin/bash

# 顯示當前狀態
echo "📂 檢查文件狀態..."
git status

# 詢問提交信息
echo "✏️ 請輸入提交信息 (直接按 Enter 使用默認信息 'Update files'):"
read commit_message

# 如果沒有輸入，使用默認信息
if [ -z "$commit_message" ]
then
    commit_message="Update files"
fi

# 執行 Git 命令
echo "🚀 開始部署..."
git add .
git commit -m "$commit_message"
git push

# 檢查是否成功
if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
    echo "🌐 網站將在幾分鐘後更新: https://richhsueh.github.io/egg-puff"
else
    echo "❌ 部署失敗，請檢查錯誤信息"
fi 
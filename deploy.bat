@echo off
chcp 65001 >nul

echo 📂 檢查文件狀態...
git status

set /p "commit_message=✏️ 請輸入提交信息 (直接按 Enter 使用默認信息 'Update files'): "

if "%commit_message%"=="" (
    set "commit_message=Update files"
)

echo 🚀 開始部署...
git add .
git commit -m "%commit_message%"
git push

if %errorlevel% equ 0 (
    echo ✅ 部署成功！
    echo 🌐 網站將在幾分鐘後更新: https://richhsueh.github.io/egg-puff
) else (
    echo ❌ 部署失敗，請檢查錯誤信息
)

pause 
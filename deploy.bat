@echo off
chcp 65001 >nul

echo 📂 檢查文件狀態...
git status

echo 🔄 同步遠程更新...
git pull

echo 🔍 檢查並清理衝突標記...
powershell -Command "(Get-Content index.html) | ForEach-Object { $_ -replace '<<<<<<< HEAD[\r\n].*?=======[\r\n].*?>>>>>>> .*?[\r\n]', '' } | Set-Content index.html"
powershell -Command "(Get-Content README.md) | ForEach-Object { $_ -replace '<<<<<<< HEAD[\r\n].*?=======[\r\n].*?>>>>>>> .*?[\r\n]', '' } | Set-Content README.md"

set /p "commit_message=✏️ 請輸入提交信息 (直接按 Enter 使用默認信息 'Update files'): "

if "%commit_message%"=="" (
    set "commit_message=Update files"
)

echo 🚀 開始部署...
git add .
git commit -m "%commit_message%"

echo 🔄 推送到遠程倉庫...
git push

if %errorlevel% equ 0 (
    echo ✅ 部署成功！
    echo 🌐 網站將在幾分鐘後更新: https://richhsueh.github.io/egg-puff
) else (
    echo ❌ 部署失敗，請檢查錯誤信息
    echo 💡 如果遇到衝突，請手動解決後重試
)

pause 
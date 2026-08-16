#!/bin/bash
#
# Effic Online — 部署脚本
# 将 dist/ 目录内容拷贝到 nginx 目录 /var/www/effic-online
#
# 用法:
#   npm run build && ./deploy.sh
#   或直接: npm run deploy
#

set -e

DEPLOY_DIR="/var/www/effic-online"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DIST_DIR="$SCRIPT_DIR/dist"

echo "========================================"
echo "  Effic Online 部署脚本"
echo "========================================"
echo "源目录:   $DIST_DIR"
echo "目标目录: $DEPLOY_DIR"
echo ""

# 检查 dist 目录是否存在
if [ ! -d "$DIST_DIR" ]; then
    echo "错误: dist 目录不存在，请先运行 npm run build"
    exit 1
fi

# 创建目标目录（如不存在）
if [ ! -d "$DEPLOY_DIR" ]; then
    echo ">> 创建目标目录 $DEPLOY_DIR"
    sudo mkdir -p "$DEPLOY_DIR"
fi

# 设置目录权限
sudo chown -R "$USER":"$USER" "$DEPLOY_DIR"

# 清空旧文件
echo ">> 清空旧的部署文件..."
rm -rf "$DEPLOY_DIR"/*

# 拷贝构建产物
echo ">> 拷贝构建产物到 $DEPLOY_DIR ..."
cp -r "$DIST_DIR"/* "$DEPLOY_DIR"/

# 拷贝 nginx 配置
echo ">> 部署 nginx 配置..."
sudo cp "$SCRIPT_DIR/nginx.conf" /etc/nginx/sites-available/effic-online
if [ ! -f /etc/nginx/sites-enabled/effic-online ]; then
    sudo ln -s /etc/nginx/sites-available/effic-online /etc/nginx/sites-enabled/effic-online
    echo "  已启用站点 effic-online"
fi

# 测试并重载 nginx
echo ">> 测试 nginx 配置..."
sudo nginx -t

echo ">> 重载 nginx..."
sudo nginx -s reload

echo ""
echo "========================================"
echo "  部署完成!"
echo "  访问: https://effic.online"
echo "========================================"

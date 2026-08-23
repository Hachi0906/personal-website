# -*- coding: utf-8 -*-
"""简单稳定的静态文件服务器，供 tank-battle.html 使用。

使用方法：
    python server.py            # 默认 0.0.0.0:8009
    python server.py 8888       # 指定端口
"""
import sys
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, unquote

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        # 跨域 & 禁用缓存，便于开发刷新
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        # IDE预览(trae-preview)会自动注入/@vite/client脚本，但我们不是Vite环境
        # 这里直接返回200空js，避免浏览器标记net::ERR_ABORTED
        if parsed.path and (parsed.path == "/@vite/client"
                            or parsed.path.endswith("/@vite/client")
                            or "/@id/" in parsed.path
                            or parsed.path.startswith("/@fs/")):
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        # 根路径 -> 默认跳 tank-battle.html
        if parsed.path in ("", "/"):
            self.send_response(302)
            self.send_header("Location", "/tank-battle.html")
            self.end_headers()
            return
        return super().do_GET()

    def guess_type(self, path):
        # 对 .html 强制 utf-8，避免中文乱码
        t = super().guess_type(path)
        if path.lower().endswith(".html"):
            return "text/html; charset=utf-8"
        return t

    def log_message(self, format, *args):
        # 简洁日志：请求行 + 状态码
        sys.stdout.write("[%s] %s\n" % (self.log_date_time_string(), format % args))
        sys.stdout.flush()


def main():
    port = 8009
    if len(sys.argv) >= 2:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("端口格式错误，使用默认 8009")
            port = 8009

    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print("=" * 56)
    print(f"  坦克大战静态服务 已启动")
    print(f"  根目录: {ROOT}")
    print(f"  主页  : http://localhost:{port}/tank-battle.html")
    print(f"  根路径: http://localhost:{port}/  (自动跳转主页)")
    print("=" * 56)
    sys.stdout.flush()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器停止")
        server.server_close()


if __name__ == "__main__":
    main()

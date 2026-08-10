from http.server import BaseHTTPRequestHandler
import json
import os
import requests

BOT_TOKEN = os.environ["BOT_TOKEN"]
CHAT_ID = os.environ["CHAT_ID"]

def format_message(data):
    date_str = data.get("date")
    date_display = date_str if date_str else "Jeszcze nie wybrano"
    categories = data.get("categories") or {}
    if not categories:
        cat_display = "Zdaje się na Ciebie 🎀"
    else:
        lines = [f"- {k}: {', '.join(v) if v else 'cokolwiek z tej kategorii'}"
                 for k, v in categories.items()]
        cat_display = "\n".join(lines)
    return f"🎟️ Nowy Bilet na Randkę!\n\n📅 Kiedy: {date_display}\n\n💖 Aktywności:\n{cat_display}"

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers["Content-Length"])
        data = json.loads(self.rfile.read(length))
        message = format_message(data)

        requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            data={"chat_id": CHAT_ID, "text": message}
        )

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"status": "ok"}).encode())
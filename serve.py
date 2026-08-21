"""Server statis untuk pengembangan lokal.

Sama seperti `python -m http.server`, tapi melarang browser menyimpan cache.
Tanpa ini, browser memakai versi lama dari data.js/main.js setelah file diedit,
sehingga perubahan tidak terlihat sampai hard refresh.
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        # senyapkan log per-request supaya terminal tidak penuh
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    print("Portfolio berjalan di http://localhost:%d  (cache dimatikan)" % port)
    ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler).serve_forever()

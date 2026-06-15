from pathlib import Path
import re

root = Path(r"c:\WORK\RCA")
new_header = '''<header>
    <div class="header-container">
      <a href="/" class="logo">
        <img src="/assets/logoMain.png" alt="RCA & Co LLP Chartered Accountants">
      </a>
      <nav>
        <a href="/">Home</a>
        <a href="about.html" class="active">About Us</a>
        <a href="services.html">Practice Areas</a>
        <a href="sectors.html">Sectors</a>
        <a href="insights.html">Meet Our Team</a>
        <a href="careers.html">Careers</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="header-actions">
        <a href="/contact.html" class="cta-btn">Connect With Us</a>
      </div>
      <button class="mobile-menu-btn">☰</button>
    </div>
  </header>'''

html_files = sorted(root.rglob('*.html'))
changed = []
for path in html_files:
    text = path.read_text(encoding='utf-8')
    new_text, count = re.subn(r'<header>.*?</header>', new_header, text, flags=re.DOTALL)
    if count == 1:
        path.write_text(new_text, encoding='utf-8')
        changed.append(path)
    elif count > 1:
        raise SystemExit(f'Multiple header blocks in {path}')

print('updated', len(changed), 'files')
for p in changed:
    print(p)

import sys, os

INTERP = os.environ['HOME'] + '/respositories/ContactManager/venv/bin/python'
if sys.executable != INTERP: os.execl(INTERP, INTERP, *sys.argv)

from ContactManager.wsgi import application
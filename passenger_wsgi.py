import sys, os

INTERP = os.environ['HOME'] + '/repositories/Contact-Manager/venv/bin/python'
if sys.executable != INTERP: os.execl(INTERP, INTERP, *sys.argv)

from ContactManager.wsgi import application
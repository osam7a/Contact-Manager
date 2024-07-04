import sys, os

INTERP = os.environ['HOME'] + '/repositories/ContactHub/venv/bin/python'
if sys.executable != INTERP: os.execl(INTERP, INTERP, *sys.argv)

from ContactHub.wsgi import application
# python3 _engine/render_slot.py <command...>
# Runs a heavy render command only when one of 2 render slots is free (several sessions render explainers at once).
# A slot is a lock dir under /tmp/claude-501/render_slots; stale locks (dead pid) are taken over.
import os, sys, time, subprocess
D = '/tmp/claude-501/render_slots'; os.makedirs(D, exist_ok=True)
def alive(pid):
    try: os.kill(pid, 0); return True
    except OSError: return False
while True:
    got = None
    for s in ('a', 'b'):
        p = os.path.join(D, s)
        try: os.mkdir(p); got = p; break
        except FileExistsError:
            try: pid = int(open(os.path.join(p, 'pid')).read())
            except Exception: continue
            if not alive(pid): os.system(f'rm -rf "{p}"')
    if got: break
    time.sleep(30)
open(os.path.join(got, 'pid'), 'w').write(str(os.getpid()))
try: sys.exit(subprocess.call(sys.argv[1:]))
finally: os.system(f'rm -rf "{got}"')

# python3 _engine/recut_loop_shorts.py <lane 0|1> <nlanes>
# Re-cuts every queued Inside Out Science Short with the hook/loop rules (2026-11-23), episode by episode in queue order.
# While an episode waits, its todo entries carry "rework_pending" (the daily upload task skips them); the flag is
# removed and duration_s updated once that episode's Shorts are re-cut.
import json, os, subprocess, sys, fcntl
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/..')
Q = 'ios_shorts_queue.json'; R = os.path.expanduser('~/cosmic-run/')
def edit(fn):
    with open('/tmp/claude-501/ios_queue.lock', 'w') as lk:
        fcntl.flock(lk, fcntl.LOCK_EX); q = json.load(open(Q)); fn(q); json.dump(q, open(Q, 'w'), ensure_ascii=False, indent=1)
lane, nl = int(sys.argv[1]), int(sys.argv[2])
q = json.load(open(Q)); eps = []
for x in q:
    if x['status'] == 'todo' and x['ep'] not in eps: eps.append(x['ep'])
for ep in eps[lane::nl]:
    r = subprocess.call(['python3', '_engine/render_slot.py', 'node', '_engine/shorts.mjs', ep, R + 'videos/out/shorts/' + ep, '1.2'])
    def done(q):
        for x in q:
            if x['ep'] == ep and x['status'] == 'todo' and r == 0 and os.path.exists(R + x['file']):
                x.pop('rework_pending', None); x['loop_cut'] = True
                x['duration_s'] = round(float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', R + x['file']])), 1)
    edit(done); print('episode', ep, 'exit', r, flush=True)

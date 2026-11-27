"""Concat finished scenes -> out/<Title>.mp4 (crf 19), _upload (crf 23), _share (<30 MB, 854 px), sheet.jpg (fps 1/22, 5x6)."""
import os, subprocess, glob, json
P = os.path.expanduser("~/cizgi/toast-long3"); T = "I_Queued_All_Night_for_a_9999_Mystery_Box"; FF = "ffmpeg"
SC = ["s0_cold", "s1_shop", "s2_line", "s2b_drop", "s3_alley", "s4_jumbo", "s5_crash", "sE_end"]
lst = f"{P}/out/list.txt"
with open(lst, "w") as f:
    for s in SC: f.write(f"file '{P}/scenes/{s}/out/Long3_{s}.mp4'\n")
run = lambda *a: subprocess.run([FF, "-v", "error", "-y", *a], check=True)
m = f"{P}/out/{T}.mp4"
run("-f", "concat", "-safe", "0", "-i", lst, "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", m)
run("-i", m, "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart", f"{P}/out/{T}_upload.mp4")
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", m], capture_output=True, text=True).stdout)
kbps = int(28 * 8 * 1024 / dur) - 96
run("-i", m, "-vf", "scale=854:-2", "-c:v", "libx264", "-preset", "slow", "-b:v", f"{kbps}k", "-maxrate", f"{int(kbps*1.3)}k", "-bufsize", f"{kbps*2}k", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "80k", "-movflags", "+faststart", f"{P}/out/{T}_share.mp4")
run("-i", m, "-vf", "fps=1/22,scale=384:-2,tile=5x6", "-frames:v", "1", f"{P}/out/sheet.jpg")
for x in (m, f"{P}/out/{T}_upload.mp4", f"{P}/out/{T}_share.mp4"): print(os.path.basename(x), round(os.path.getsize(x) / 1e6, 1), "MB")
print("duration", round(dur, 1))

import json
fx=lambda kind,t,db=0: {"t":round(t,2),"kind":kind,"gain_db":db}
T=json.load(open('work/timeline.json'))['shots']; S=lambda n:T[n-1]['s']
IMP=S(13)+1.0; EAT=S(7)+34/30
sfx=[fx("sting",0.05,-2),fx("door",0.3,-8),fx("tick",S(2)+0.05,-4),fx("tick",S(2)+0.25,-4),fx("tick",S(2)+0.45,-4),fx("ding",S(3)+0.3,-6),
 fx("tick",S(5)+32/30,-3),fx("pop",S(5)+50/30,0),fx("boing",S(6)+8/30,-1),
 *[fx("pop",EAT+(i*5+10)/30,-6+i*0.5) for i in range(7)],*[fx("tick",EAT+(i*5+11)/30,-1) for i in range(7)],
 fx("boing",S(8)+10/30,-1),fx("thud",S(8)+20/30,0),fx("bell",S(9)+0.05,-4),fx("ding",S(11)+1.25,-6),fx("boing",S(12)+0.05,-1),
 fx("footsteps",S(13),-4),fx("impact",IMP,0),fx("crash",IMP,0),fx("stamp",IMP+0.05,2),fx("pop",S(15)+0.15,-2)]
end=T[-1]['e']
json.dump({"voice":"work/voice.wav","music":{"style":"mischief","bpm":118,"start":0,"stop":round(end-0.1,2),"level_db":-18},"sfx":sfx},open('sound.json','w'),indent=1)
json.dump({"squeak":[S(4)+0.25,"dino_laugh_squeak",0.6,0.3],"burp_short":[EAT+(6*5+14)/30,"dino_burp_short",0.6,1.0],"burp_loud":[S(10)+0.1,"dino_burp_loud",0.75,1.0],"laugh":[S(14)+0.05,"dino_laugh_oldman",0.6,1.8]},open('work/extras.json','w'),indent=1)
print("sound ok")

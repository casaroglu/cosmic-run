#!/bin/zsh
cd ~/cizgi/toast-long4
for s in s3_floor s4_walls s5_girls s6_under; do
  until grep -aq "== $s done" work/cb2.log; do sleep 10; done
  echo "== build $s $(date +%H:%M)"; work/build_scene.sh $s all
done
echo "== build s0 $(date +%H:%M)"; work/build_scene.sh s0_cold render
echo "== concat $(date +%H:%M)"; work/concat.sh
echo "== chain done $(date +%H:%M)"

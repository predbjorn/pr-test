# THROTTLE — first-person time-trial runner (prototype)

A browser first-person runner with one twist: **you control the speed.** Same
track every run, so the only goal is to complete it in the fastest time. It's a
single self-contained HTML file — no build step, no dependencies.

## Play it

Open `game/index.html` in a browser. For phone, serve the folder and open it on
your device (same Wi-Fi):

```bash
cd game
python3 -m http.server 8080
# then browse to http://<your-computer-ip>:8080 on your phone
```

Best time is saved locally (localStorage) so you can chase it.

## Controls (portrait, two thumbs)

- **Right edge – throttle pedal:** drag up for more gas, down to back off. You
  set the target speed; the car eases toward it.
- **Left/main area – steering:** slide your thumb left/right. Screen-left is a
  hard left, screen-right a hard right, centre is straight. Release to
  straighten the wheel.
- Desktop fallback: arrow keys / WASD (Up-Down = throttle, Left-Right = steer).

## The twist / risk–reward

Flooring it isn't free:

- **Corners** throw centrifugal force at you that scales with speed — carry too
  much into a bend and you get pushed off the tarmac.
- **Off track** drags your speed down hard until you get back on.
- **Barriers** in the lanes spin you out on contact: near-stop + brief loss of
  control.

Every mistake costs seconds, so the skill is choosing *when* to lift off and
when to send it. Slow-and-clean vs. fast-and-risky is the whole game.

## Implementation notes

- Pure HTML/CSS/JS, one file, `<canvas>` scanline pseudo-3D renderer with
  parabolic curve bending and distance haze.
- Deterministic track (seeded PRNG) so lap times are comparable between runs.
- `window.THROTTLE` exposes the live game-state object for debugging.

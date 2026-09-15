"""Export one original CSS levitate cycle, 3840x2160, 60 fps, exactly 8 s.

The 720x620 illustration is uniformly fitted to a neutral 16:9 studio canvas.
Original transform-origin: 50% 55%; frames: 0/100% (0px,-2deg), 50% (-11px,2deg).
Each half-cycle uses CSS ease-in-out = cubic-bezier(.42,0,.58,1).
There is no 3D/camera animation and no additional rotation or scene duration.
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import argparse
import math
import subprocess
import numpy as np
from PIL import Image


def ease(x):
    lo, hi = 0., 1.
    for _ in range(48):
        t = (lo + hi) / 2
        bx = 3 * (1 - t)**2 * t * .42 + 3 * (1 - t) * t*t * .58 + t**3
        if bx < x:
            lo = t
        else:
            hi = t
    return 3 * (1 - t) * t*t + t**3


def original_motion(seconds):
    phase = (seconds % 8) / 4
    amount = ease(phase) if phase <= 1 else 1 - ease(phase - 1)
    return -11 * amount, -2 + 4 * amount


def export(master, output):
    width, height, fps, frames = 3840, 2160, 60, 480
    source = Image.open(master).convert("RGBA")
    source_scale = source.width / 720
    scale = height / 620
    offset_x = (width - 720 * scale) / 2
    origin_x, origin_y = 360, 341
    # A fixed neutral studio background; no motion is added to the scene.
    yy, xx = np.ogrid[:height, :width]
    glow = np.exp(-2 * (((xx - width*.5)/(width*.58))**2 + ((yy - height*.47)/(height*.75))**2))
    bg = np.empty((height, width, 3), np.uint8)
    for channel, (base, light) in enumerate(((243, 253), (245, 254), (248, 255))):
        bg[:, :, channel] = np.rint(base + glow*(light-base))
    background = Image.fromarray(bg, "RGB").convert("RGBA")
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    process = subprocess.Popen([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "3840x2160", "-r", "60", "-i", "-",
        "-an", "-c:v", "libx264", "-threads", "4", "-preset", "medium", "-crf", "17",
        "-profile:v", "high", "-level:v", "5.2", "-pix_fmt", "yuv420p",
        "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
        "-movflags", "+faststart", str(output)
    ], stdin=subprocess.PIPE)

    def render(frame):
        ty, degrees = original_motion(frame / fps)
        theta = math.radians(degrees)
        c, s = math.cos(theta), math.sin(theta)
        # Inverse of translateY(ty) rotate(degrees), around the original origin.
        factor = source_scale / scale
        a, b = factor*c, factor*s
        d, e = -factor*s, factor*c
        tx = source_scale*(origin_x-c*(offset_x/scale+origin_x)-s*(origin_y+ty))
        ty_inv = source_scale*(origin_y+s*(offset_x/scale+origin_x)-c*(origin_y+ty))
        transformed = source.transform((width, height), Image.Transform.AFFINE,
            (a, b, tx, d, e, ty_inv), resample=Image.Resampling.BICUBIC)
        result = Image.alpha_composite(background, transformed).convert("RGB")
        if frame in (0, 120, 240, 360):
            result.resize((1280,720), Image.Resampling.LANCZOS).save(f"/tmp/mobius-frame-{frame:03d}.jpg", quality=95)
        return result.tobytes()

    try:
        with ThreadPoolExecutor(max_workers=4) as pool:
            # Bounded queue: keep memory stable while ffmpeg consumes the frames.
            for start in range(0, frames, 8):
                for frame in pool.map(render, range(start, min(start+8, frames))):
                    process.stdin.write(frame)
                if start % 60 == 0:
                    print(f"Export: {start}/{frames} frames", flush=True)
    finally:
        process.stdin.close()
    if process.wait() != 0:
        raise RuntimeError("Video encoding failed")
    print(f"Saved {output}: {output.stat().st_size:,} bytes; 480 frames / 60 fps / 8 s.", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("master", nargs="?", default="/tmp/mobius-master.png")
    parser.add_argument("--output", default="assets/mobius-studio-4k60.mp4")
    args = parser.parse_args()
    export(args.master, args.output)

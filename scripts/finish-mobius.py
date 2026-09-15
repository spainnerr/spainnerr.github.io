"""Convert the offline linear-light render to transparent, responsive web assets.

No geometry, camera, object transform or animation is modified here.
Dependencies: numpy, scipy, Pillow. The C++ renderer supplies linear float RGBA.
"""
from pathlib import Path
import argparse
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter


def finish(raw_path, width, output):
    height = width * 620 // 720
    scale = width / 720
    rgba = np.fromfile(raw_path, dtype=np.float32).reshape(height, width, 4)
    alpha = rgba[:, :, 3]
    yy, xx = np.ogrid[:height, :width]
    # Match the placement of the original illustration's floor and object shadow.
    floor = .13 * np.exp(-2.6 * (((xx / scale - 355) / 243) ** 2 + ((yy / scale - 514) / 53) ** 2))
    contact = .07 * np.exp(-2 * (((xx / scale - 365) / 159) ** 2 + ((yy / scale - 494) / 20) ** 2))
    shadow = gaussian_filter(alpha, sigma=14 * scale, mode="constant")
    offset = round(21 * scale)
    shadow[offset:] = shadow[:-offset].copy()
    shadow[:offset] = 0
    shadow = np.clip(shadow * .10 + floor + contact, 0, .30).astype(np.float32)
    # Restrained highlight bloom; retain the sharp silhouette and central opening.
    highlights = np.maximum(rgba[:, :, :3] - .82, 0).mean(axis=2)
    bloom = gaussian_filter(highlights, sigma=2.1 * scale, mode="constant") * .08
    rgba[:, :, :3] += bloom[:, :, None] * np.array([.72, .88, 1.], np.float32)
    shadow_rgb = np.array([.032, .16, .32], np.float32)
    out_alpha = alpha + shadow * (1 - alpha)
    premul = rgba[:, :, :3] + shadow[:, :, None] * shadow_rgb * (1 - alpha[:, :, None])
    rgb = premul / np.maximum(out_alpha[:, :, None], 1e-6)
    rgb = np.where(rgb <= .0031308, rgb * 12.92, 1.055 * np.maximum(rgb, 0) ** (1 / 2.4) - .055)
    rgba[:, :, :3] = np.clip(rgb, 0, 1)
    rgba[:, :, 3] = out_alpha
    image = Image.fromarray(np.round(np.clip(rgba, 0, 1) * 255).astype(np.uint8), "RGBA")
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output)
    print(f"Saved {output} ({width} x {height})", flush=True)
    return image


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("raw")
    parser.add_argument("--width", type=int, default=5760)
    parser.add_argument("--output", default="/tmp/mobius-master.png")
    parser.add_argument("--assets", action="store_true")
    args = parser.parse_args()
    image = finish(args.raw, args.width, args.output)
    if args.assets:
        for width in (1280, 2560, 3840):
            size = (width, round(width * 620 / 720))
            target = Path(f"assets/mobius-studio-{width}.webp")
            image.resize(size, Image.Resampling.LANCZOS).save(target, quality=95, method=6)
            print(f"Saved {target}: {target.stat().st_size:,} bytes", flush=True)

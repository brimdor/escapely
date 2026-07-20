#!/usr/bin/env python3
"""Convert assets/engagement-messages.yaml to assets/engagement-messages.json.

Run this before pushing whenever assets/engagement-messages.yaml changes.
Keeps the source-of-truth editable as YAML while the site consumes JSON.
"""

import json
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
YAML_PATH = REPO_ROOT / "assets" / "engagement-messages.yaml"
JSON_PATH = REPO_ROOT / "assets" / "engagement-messages.json"


def main() -> int:
    if not YAML_PATH.exists():
        print(f"Missing {YAML_PATH}", file=sys.stderr)
        return 1

    data = yaml.safe_load(YAML_PATH.read_text(encoding="utf-8"))

    # Normalize: ensure a top-level messages array exists.
    if not isinstance(data, dict) or "messages" not in data:
        print("YAML root must be a 'messages' list.", file=sys.stderr)
        return 1

    # Validate and surface issues early.
    for idx, msg in enumerate(data["messages"], 1):
        if not isinstance(msg, dict):
            print(f"Message {idx} is not an object", file=sys.stderr)
            return 1
        if "id" not in msg or not msg["id"]:
            print(f"Message {idx} missing 'id'", file=sys.stderr)
            return 1
        if "message" not in msg or not isinstance(msg["message"], str):
            print(f"Message {idx} missing 'message' text", file=sys.stderr)
            return 1
        contributors = msg.get("contributors", [])
        if not isinstance(contributors, list) or not contributors:
            print(f"Message {idx} must have at least one contributor", file=sys.stderr)
            return 1
        for c in contributors:
            if not isinstance(c, dict) or "first_name" not in c or "last_name" not in c:
                print(f"Message {idx} contributor missing first_name/last_name", file=sys.stderr)
                return 1

    JSON_PATH.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Wrote {JSON_PATH} ({len(data['messages'])} messages)")
    return 0


if __name__ == "__main__":
    sys.exit(main())

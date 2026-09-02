#!/usr/bin/env bash
#
# Copy content and UI changes from this repo into the GitHub Pages mirror
# (SmritiReddyy/SmritiReddyy.github.io) and push, which triggers its deploy.
#
# Why this exists: the admin panel writes data/portfolio-config.json to *this*
# repo only. The mirror is a separate repo, so it needs the change copied over
# or it will keep serving stale projects.
#
# Usage:  ./scripts/sync-mirror.sh [--dry-run]
#
# The mirror checkout defaults to a sibling directory and is cloned on first
# run. Override with MIRROR_DIR=/some/path.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIRROR_DIR="${MIRROR_DIR:-$(dirname "$REPO_ROOT")/SmritiReddyy.github.io}"
MIRROR_URL="https://github.com/SmritiReddyy/SmritiReddyy.github.io.git"

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

# Files shared between the two repos. Deliberately excluded, because the mirror
# has its own versions: next.config.ts (static export), app/layout.tsx (no
# Vercel Analytics), package.json / package-lock.json, .github/, README.md, and
# everything under app/api and app/admin, which the mirror does not have at all.
PATHS=(
  data
  components
  public
  app/page.tsx
  app/icon.tsx
  app/globals.css
  lib/github.ts
  lib/types.ts
)

if [[ ! -d "$MIRROR_DIR/.git" ]]; then
  echo "==> Cloning mirror into $MIRROR_DIR"
  git clone --quiet "$MIRROR_URL" "$MIRROR_DIR"
else
  echo "==> Updating mirror checkout at $MIRROR_DIR"
  git -C "$MIRROR_DIR" fetch --quiet origin
  git -C "$MIRROR_DIR" checkout --quiet main
  git -C "$MIRROR_DIR" reset --quiet --hard origin/main
fi

echo "==> Copying shared paths"
for p in "${PATHS[@]}"; do
  if [[ ! -e "$REPO_ROOT/$p" ]]; then
    echo "    skip (missing here): $p"
    continue
  fi
  mkdir -p "$MIRROR_DIR/$(dirname "$p")"
  # --delete keeps directories in step when files are removed upstream.
  rsync -a --delete "$REPO_ROOT/$p" "$MIRROR_DIR/$(dirname "$p")/"
  echo "    synced: $p"
done

cd "$MIRROR_DIR"

if git diff --quiet && git diff --cached --quiet && [[ -z "$(git status --porcelain)" ]]; then
  echo "==> Mirror already up to date; nothing to push."
  exit 0
fi

echo "==> Changes to publish:"
git --no-pager diff --stat HEAD

if $DRY_RUN; then
  echo "==> --dry-run given; leaving the mirror checkout dirty and not pushing."
  exit 0
fi

git add -A
git commit --quiet -m "Sync content from smriti-portfolio

Copied from SmritiReddyy/smriti-portfolio@$(git -C "$REPO_ROOT" rev-parse --short HEAD)."
git push --quiet origin main

echo "==> Pushed. Deploy: https://github.com/SmritiReddyy/SmritiReddyy.github.io/actions"
echo "==> Live in ~1 min: https://smritireddyy.github.io"

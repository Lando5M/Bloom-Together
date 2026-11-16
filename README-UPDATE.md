# Bloom Together — V3 upgrade

This update retains the six original decks and 331-question bank, and adds 8 decks (128 more original questions), game modes, swipe gestures, tap-to-flip cards, depth filtering, and customization.

## Install the update
1. Export a backup from your existing Bloom Together Settings before updating.
2. Unzip this archive.
3. In your EXISTING GitHub repository, upload ALL files and folders from the extracted directory into the repository root. Overwrite existing files when prompted; do not delete other files or the repository.
4. Commit changes. Wait for GitHub Pages to deploy.
5. Open the live website in Chrome, while online, and refresh. Close and reopen the installed PWA if needed.
6. Check the six original decks, favorites, custom decks and custom questions.

## Important
Existing app data is stored in localStorage under bloom-together-v1 and is retained. Existing question bank is merged in place and original 331 questions are not intentionally removed. New decks have stable IDs and won't duplicate on reload. Customization is saved separately under bloom-together-custom-v3. Depth labels are generated deterministically by question text; they are browsing tags, not editorially curated classifications. No cloud sync is included.

If you clear Chrome's site data, local data is lost unless you have a backup. Updates to the service worker cache use v3.

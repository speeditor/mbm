# Monobook Mobile (mbm)
Monobook-dependent mobile wrapper for FANDOM websites. Written in JS.

This isn't stable yet. Not a mobile skin, just a code experiment on adaptability.

# Issues
* Architectural weakness (parses normal Monobook content). Two solutions: remove styling and incorporate template data, or use Mercury content (`?action=render&useskin=mercury`).
* Dependence on `zoom` property.

# TO-DO
* Correct unstyled areas:
  * Forum
  * Blogs
  * Article comments
  * User profiles
* Oasis wiki navigation
* Single-page application

![logo](logos/icon128.png)
# MISPnomer

**Work in progress** of a MISP Chrome browser plugin which aides in IoC ingestion from webpages.

## Current features

- Search for selected indicator
  - Select IoC you wanna check > right click > MISPnomer > Search attribute
- Add selection as freetext import in new event
  - Select text you want to import > right click > MISPnomer > Add freetext event

## Potential future features

- Add single and multiple IoCs to custom event
- Add single and multiple IoCs to existing event
  - Let user collect IoCs and store them in Chrome
  - User can open popup and select "Add to existing event"
  - Populate index of MISP events as dropdown
  - User selects existing event and presses "submit"
  - Extension will send assembled JSON request to MISP
- Extract all indicators from a page automagically (e.g. Hybrid Analysis)
- Support creation of objects
- Add sightings
- Keyboard shortcuts

## Howto

If you want to test this:

- Download, unpack, go to Chrome Extensions, "load unpacked extension"
- Go to Options page, set MISP URL (e.g. https://misp.local/) and save
- Login into MISP. Shortcut: You can press right click on a page > Goto MISP.
- Try out the plugin's search feature. If that works, the other features will
- If you encounter issues, make an Issue here or talk to me on Gitter

## Compatibility

- Tested with Chrome 61 and MISP V
- Does require a modern browser, since it relies on ECMAScript 6 features.

## Security notes

- Only communication happens between this extension and MISP itself.
- No JavaScript frameworks or modules used.
- No calls to 3rd party APIs.
- Does not require MISP auth key or password - relies on you logging in yourself
- Does use Chrome's local storage. Settings are not shared in between Chrome instances

## License note

GNU Affero General Public License

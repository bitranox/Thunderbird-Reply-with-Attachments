# pack distributions

## manifest id setting

When updating a Thunderbird extension, the id in the manifest.json file must remain the same as the one used in the previous version.
This ensures Thunderbird recognizes the update as belonging to the same extension.

Here’s how to handle the id for updates based on your distribution method:

### First Time Publishing on ATN (needs ID on Manifest V3)

When you upload your extension to ATN, you need to include the id field in your manifest.json V3 file.
ATN will automatically assign an ID to your extension upon submission.

### Update on ATN (needs ID on Manifest V3)

ATN assigns a unique ID to your extension when you first submit it. For subsequent updates, the id should match this assigned value.(?)
Use the same ID You used on First time publishing (?)

- Ensure the version number in manifest.json is incremented (e.g., 1.0 → 1.1).
- Package and upload your updated extension to ATN.
- ATN matches the id automatically with the one assigned previously.

### Private Distribution (keep id consistent)

Keep the id consistent:
The id in the updated manifest.json file must match the id used in the original release.
Thunderbird uses the id to determine whether the updated extension replaces the existing one.
Increment the version field with each update.

```json
{
  "id": "thunderbird-addon-reply-with-attachments_bitranox@gmail.com",
  "version": "1.0",
  ...
}
```

### Development and Testing (keep id consistent)

Keep the id consistent between test builds:
This ensures Thunderbird recognizes the updated test version as a continuation of the previous one.
Use the same id across all versions you test locally.

## packing distribution files

### private packing (ID set to `thunderbird-addon-reply-with-attachments_bitranox@gmail.com`)

- set the version number !
- pack `manifest_PRIVATE.json` as `manifest.json` into the zip file "reply-with-attachments-plugin-LOCAL.zip"

### ATN packing (ID not set)

- set the version number !
- pack `manifest_ATN.json` as `manifest.json` into the zip file "reply-with-attachments-plugin-ATN.zip"

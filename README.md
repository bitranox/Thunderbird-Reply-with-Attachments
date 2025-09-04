# Reply with Attachments

## ![DE Flag](https://github.com/ashleedawg/flags/blob/master/DE.png?raw=true) [Zur deutschen Version](README_DE.md)

**Reply with Attachments** is a official Thunderbird add-on that automatically includes attachments from the original email when replying to a message. Additionally, SMIME certificates are excluded from being attached.

---

## Features

- Automatically attaches files from the original email when replying.
- Skips SMIME certificates to avoid unnecessary attachments.

Screenshot demonstrating the add-on in action:

![Reply with Attachments Screenshot](screenshot.png)


---

## Installation - in Thunderbird (recommended for automatic updates)
1. in Thunderbird navigate to **Tools > Add-ons and Themes** and search for "reply with attachments" and add the Add-on

---

## Installation - PRIVATE - from the official Add-on Page (for development)

### Step 1: Download the XPI File
1. Go to the [Thunderbird Add-on Page](https://addons.thunderbird.net/de/thunderbird/search/?q=reply%20with%20attachments)
2. Download the latest version of the add-on as XPI file (`reply_with_attachments-x.y.z-tb.xpi`).

### Step 2: Install in Thunderbird 
1. In the **Add-ons Manager**, click on the gear icon in the top-right corner.
2. Select **Install Add-on From File...** from the dropdown menu.
3. Choose the downloaded `reply_with_attachments-x.y.z-tb.xpi` file.
4. Confirm the installation when prompted.

---

## Installation - PRIVATE - latest Version from Github  (for development)

### Step 1: Download the ZIP File
1. Go to the [Releases](https://github.com/bitranox/Thunderbird-Reply-with-Attachment/releases) section of this repository.
2. Download the latest version of the add-on as ZIP file (`reply-with-attachments-plugin-PRIVATE.zip`).
3. In the **Add-ons Manager**, click on the gear icon in the top-right corner.
4. Select **Install Add-on From File...** from the dropdown menu.
5. Choose the downloaded ``reply-with-attachments-plugin-PRIVATE.zip`` file.
6. Confirm the installation when prompted.

### Step 2: Install in Thunderbird
1. Open Thunderbird.
2. Navigate to **Tools > Add-ons and Themes**.
3. In the **Add-ons Manager**, click on the gear icon in the top-right corner.
4. Select **Install Add-on From File...** from the dropdown menu.
5. Choose the downloaded `reply-with-attachments-plugin-PRIVATE.zip` file.
6. Confirm the installation when prompted.

---

## Usage

1. Open an email in Thunderbird.
2. Click **Reply** or **Reply All**.
3. The add-on will automatically include any attachments from the original email in the reply.
4. SMIME certificates will be skipped.

---

## Compatibility

- **Tested with Thunderbird Nebula 128.6.0esr (64-Bit).**
- **Older Thunderbird versions are not supported.**

---

## Troubleshooting

- If the add-on does not work as expected, ensure that you are using a compatible version of Thunderbird (128.6.0esr or later).
- Check the Thunderbird error console (**Tools > Developer Tools > Error Console**) for any issues related to the add-on.

---

## Contributing

If you'd like to contribute to this project:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature name"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

---

## Development

- Build add-on ZIPs: `make pack`
- Run tests (Vitest): `make test`
- Discover commands: `make help`

Packaged files are created as `reply-with-attachments-plugin*.zip` in the repository root. For manual testing in Thunderbird, use Tools → Add-ons and Themes → gear menu → Install Add-on From File… and select the built ZIP.

---

## Support This Project

If you like this add-on, consider supporting its development with a small contribution:

[![Donate via PayPal](https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

---

## License

This project is licensed under the GNU General Public License v3.  
You can view the full license text [here](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/LICENCE).

---

## Acknowledgments

Special thanks to the Thunderbird add-on developer community for their excellent documentation and support.


---

## Version History / Changelog

### V1.0.1
- Replaced the custom `getAttachmentsFromMessage()` function, which manually traversed MIME parts to find attachments, with the standard method `browser.messages.listAttachments()`.

### V1.0.0
- Initial release.

# scriptable

A collection of my scriptable.app scripts.

These are open-spource and you are free to use or edit them for your personal use. It would be nice to get credit for them though.

If you enjoy these scripts and find them useful, please consider sponsoring so I can continue the work that I do.

## Scripts

### WakaStats

![](/images/wakastats.jpeg)

This script shows you your combined stats from WakaTime for the Last 7 days.

- Categories
- Editors
- Languages
- Daily Average Coding Time
- Total Coding Time
- Operating Systems

This script depends on the Cache.js script (above) from [EvanDColeman](https://github.com/evandcoleman) also. Make sure you put it in Scriptable as well.

#### How to install

1. Grab both the WakaStats.js and Cache.js scripts from the /src folder.
2. Place them in the Scriptable folder in your iCloud Drive or copy and paste the code into a new scriptable in the scriptable.app.
3. Fill out the values in the TODO section of the WakaStats.js script.

```javascript
// TODO: PLEASE SET THESE VALUES
const YOURNAME = 'TODO';
const WAKAUSER = 'TODO';
const API_KEY = 'TODO'; // Your wakatime API KEY from https://wakatime.com/api-key   
```

You may also set up [automations in Shortcuts](https://support.apple.com/guide/shortcuts/create-a-new-personal-automation-apdfbdbd7123/ios) to run this script, to check for updates at times other than the ones dictated by Scriptable's normal widget refresh interval.

#### Shoutouts

I want to send a HUGE thanks to the follow people for helping me with this script. I'd probably still be stuck on some errors if it wasnt for them ☺️.

- [Simon Stovring](https://twitter.com/simonbs)
- [Josh Holtz](https://twitter.com/joshdholtz?s=21)
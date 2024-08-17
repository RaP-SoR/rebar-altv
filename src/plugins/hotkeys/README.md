# rebar-hotkeys

This is a script for Rebar that manages hotkeys with long-press detection.

### Features

* Binds hotkeys to callback functions.
* Detects long-presses for hotkeys with a configurable timeout.

### Installation

This script requires the `Rebar` framework for alt:V.

1. Clone the repository in your `plugins` folder:

   ```bash
   git clone https://github.com/nightowl07/rebar-hotkeys src/plugins/hotkeys
   ```

### Usage

1. Get the API

   ```javascript
   await alt.Utils.waitFor(() => useClientApi().isReady('hotkey-api'));
   const hotkeyApi = useClientApi().get('hotkey-api')
   ```

2. Use the `hotkeyApi` function to get access to the `addHotkey` and `removeHotkey` functions:

   ```javascript
   // Example usage
   hotkeyApi.addHotkey(84, (isLongPress) => {
       if (isLongPress) {
           console.log('T key long-pressed!');
       } else {
           console.log('T key pressed!');
       }
   });
   ```

   * `addHotkey(key, callback)`: Binds a hotkey identified by its key code to a callback function. The callback function receives a boolean argument indicating whether the key was held long enough to be considered a long-press.
   * `removeHotkey(key)`: Removes the hotkey binding for the specified key code.

### Configuration

* `longPressTimeout`: This variable defines the time (in milliseconds) after which a key press is considered a long-press. You can modify this value in the constructor of the `HotKeyManager` class.
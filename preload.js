const usb = require('usb');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }

    const showDevices = () => {
        const devices = usb.getDeviceList()
        const data = devices.map(d => `pid: ${d.deviceDescriptor.idProduct}, vid: ${d.deviceDescriptor.idVendor}`).join('\n')
        replaceText('devices', data)
    }

    usb.on('attach', showDevices)
    usb.on('detach', showDevices)
    showDevices()
})

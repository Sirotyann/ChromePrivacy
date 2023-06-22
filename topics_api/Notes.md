# doc
https://developer.chrome.com/docs/privacy-sandbox/topics/

# demo
https://topics-demo.glitch.me/

# debug
chrome://topics-internals/ 

# hmm...
doesn't work

# fetch with browsingTopics
sending a request by fetch can take a browsingTopics attribute:
`fetch('/fetchTopics', { browsingTopics: true })`
It will send request with a `sec-browsing-topics` in request header.

# iframe attribute
`<iframe src="https://example.com" browsingtopics>`

# how to run demo.
- Run chrome with params: --enable-features=BrowsingTopics:time_period_per_epoch/15s,PrivacySandboxAdsAPIsOverride,PrivacySandboxSettings3,OverridePrivacySandboxSettingsLocalTesting
- Add "topics-demo.glitch.me" to hosts file
- Run server: `node server.js`
- Visit https://topics-demo.glitch.me:8443/
- Override https://pets-animals-pets-cats.glitch.me/ at Chrome, replace "https://topics-demo.glitch.me" with "https://topics-demo.glitch.me:8443/"
- Visit https://pets-animals-pets-cats.glitch.me/ for a few times.
- Visit https://topics-demo.glitch.me:8443/, click 'Get Topics', topics will be printed at console.
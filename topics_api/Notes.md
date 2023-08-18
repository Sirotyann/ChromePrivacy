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

# description
- What is Topics API
The Topics API provides a new form of interest-based advertising using topics (categories of interest) that are assigned to a browser based on recent user activity.

- How it works
With the Topics API, the browser observes and records topics that appear to be of interest to the user, based on their browsing activity. 
This information is recorded on the user's device. 
The Topics API can then give API callers (such as ad tech platforms) access to a user's topics of interest, but without revealing additional information about the user's browsing activity.

- How Chrome select topics
The browser infers topics for a user based on their browsing activity during a period of time known as an epoch, currently one week.
The API returns one topic for each epoch, up to a maximum of three. The topic selected for each epoch is randomly selected from the user's top five topics for that time period.
There is a 5% chance the topic is randomly selected from all possible topics in a taxonomy of interests.
    taxonomy: https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v2.md
    The list of topics used by the Topics API is public, human-curated, human-readable, and designed to avoid sensitive categories.
With the current design of the Topics API, topics are inferred from the hostnames of pages the user visits.

- Topics inferred
chrome://topics-internals

- Trail
redtube.com

AyOXnas+DC9u+suGztcjBY11som0ni2vBiBbwZoeqh1SZEyaV8J2nlkoM678vdIeN1/9MQNFH6slIfq3DBZgjQcAAACBeyJvcmlnaW4iOiJodHRwczovL3JlZHR1YmUuY29tOjQ0MyIsImZlYXR1cmUiOiJQcml2YWN5U2FuZGJveEFkc0FQSXMiLCJleHBpcnkiOjE2OTUxNjc5OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9

Valid Until Sep 19, 2023


localhost:9443

Ax2z1kSVU1C/OlGBegnpgRDQwOYXqNqih8CCSg9ywftOMxo4bIqM6s/htQh+CP9NGupGO69GoOOvez9pmSVLpgUAAABteyJvcmlnaW4iOiJodHRwczovL2xvY2FsaG9zdDo5NDQzIiwiZmVhdHVyZSI6IlByaXZhY3lTYW5kYm94QWRzQVBJcyIsImV4cGlyeSI6MTY5NTE2Nzk5OSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==
# Browser Changes - Chrome Privacy
This repository is for experimenting the new features form [Chrome Privacy Sandbox](https://developer.chrome.com/docs/privacy-sandbox/overview/)

Some features might require latest version of Chrome, and with some specific flags turned on.

# The Privacy Sandbox proposal
## Timeline
https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline

### Key proposals:
1. Fight spam and fraud on the web ( User identification )
- Private State Tokens ( Trust Tokens ) - Verify user is not fake
    Trust Tokens enable trust of a user (to confirm that a user is not fake) in one context to be conveyed to another context, without identifying the user or linking their identity across websites.
    With the Private State Token API, a website can issue cryptographic tokens to a user it trusts, which can later be used elsewhere. The tokens are stored securely by the user's browser, and can then be redeemed in other contexts to confirm the user's authenticity.

    The issuer site uses the Trust Tokens JavaScript API to trigger a request for trust tokens and get a trust token from issuer.com server.
    The user's browser securely stores trust token.
    User visit news.com. The site news.com wants to verify user to show ads. It uses the Trust Tokens API to check if the user's browser has trust tokens stored for issuers that the site trusts.
    The news.com site makes a request to the issuer.com to redeem the trust tokens, and get a redemption record.
    The news.com site makes a request to the ads platform with the redemption record.
    The ads platform knows this user is trusted by issuer.com to be a real human, so it provides the data to display the ad.

2. Show relevant content and ads
- Protected Audience API (FLEDGE) - To show ads base on interest group, without knowing user browser's behavior.
    Site A register a `bidding-logic.js` to an interest group, saved by Chrome. 
    Site B call `navigator.runAdAuction` to get ad url from that interest group and show ad in a <fencedframe/>

- Topics API
    It enables interest-based advertising (IBA) without having to resort to tracking the sites a user visits. 
    Looks like the topics are define by browsers, could be get by `document.browsingTopics()`

3. Ads statistics
- Attribution Reporting API
    Measure when an ad click or view leads to a conversion, such as a purchase on an advertiser site.

4. Cross-site privacy
- CHIPS                 -   Separate cookie jar per top-level site
    Partitioned cookie, share cookie by iframe won't be allowed. 
    The cookies of two iframes of site c are separated: <Site_A><iframe src='Site_C' /></Site_A>, <Site_B><iframe src='Site_C' /></Site_B>

- First-Party Sets      -   Allow related domain names owned by the same entity to declare themselves as belonging to the same first party.
    Share cookies among sites like `brandx.com` and `fly-brandx.com`, `example.com` and `example.rs`.

- Shared Storage        -   Allows sites to store and access unpartitioned cross-site data
    Cross-site iframes content selection.

- Storage Partitioning  -   LocalStorage partitioned by origin.
    Similar as CHIPS

- Fenced Frames         -   Securely embed content onto a page without sharing cross-site data.
    Partitioned localstorage. With iframe, the localstorage of the same origin could be shared.
    Just as CHIPS, the iframe localstorage of different parent window origin are separated.

- Network State Partitioning                -   Prevent browser network resources being shared across first-party contexts.
    Requests to the same destination across pages can reuse the same socket, and DNS lookups across pages will use the same cache.
    This allows for side-channel timing attacks, where one site can figure out if another has been visited recently. For example, if the connection is made quickly, it may be assumed that the socket was warm.
    With this proposal, each request will have an additional "network partition key" that must match in order for resources to be reused.   

- Federated Credential Management (FedCM)   -   Federated identity without sharing the user's email address or other identifying information.
    Enable users to log into sites without sharing their personal information with the identity service or the site

# Early hints
Early Hints is an HTTP status code (103 Early Hints) used to send a preliminary HTTP response ahead of a final response. 

This allows a server to send hints to the browser about critical sub-resources (for example, stylesheet for the page, critical JavaScript) or origins that will be likely used by the page, while the server is busy generating the main resource. 

# Doc
https://developer.chrome.com/blog/early-hints/

# Relationship to H2/Push
Early Hints requires a round trip for the browser to start fetching critical sub-resources.
With HTTP2/Push the server could start pushing sub-resources alongside the response.
But HTTP2/Push is removed.
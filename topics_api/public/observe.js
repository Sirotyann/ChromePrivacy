/* Copyright 2022 Google LLC.
SPDX-License-Identifier: Apache-2.0 */

async function getTopics() {
    try {
        if ('browsingTopics' in document &&
            document.featurePolicy.allowsFeature('browsing-topics')) {
            console.log('document.browsingTopics() is supported');
            const topics = await document.browsingTopics();
            console.log('Called from topics-demo.glitch.me/observe/index.html in iframe:',
                topics, '\nNumber of topics: ', topics.length);

        } else {
            console.log('document.browsingTopics() not supported');
        }

    } catch (error) {
        console.log('Error:', error);
    }
}

getTopics();

// document.browsingTopics().then(console.log);
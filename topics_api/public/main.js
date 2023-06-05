/* Copyright 2022 Google LLC.
SPDX-License-Identifier: Apache-2.0 */

import taxonomy from './taxonomy.js';


var fetchData = document.getElementById('fetch-data');
const logEl = document.getElementById('log');
const noTopicsEl = document.getElementById('no-topics');
const noHeadersEl = document.getElementById('no-headers');

let currentTopics = [];
let currentEpoch = 1;

async function getTopics() {
    try {
        const topics = await document.browsingTopics();
        console.log("getTopics", topics);
        let returnedTopics = [];
        for (const topic of topics) {
            returnedTopics.push(taxonomy[topic.topic]);
        }
        //    console.log(new Date(), returnedTopics);
        if (returnedTopics.length &&
            // Check if topics have changed — topics are returned in random order.
            !returnedTopics.every((item) => currentTopics.includes(item))) {
            currentTopics = returnedTopics;
            noTopicsEl.classList.add('hidden');
            noHeadersEl.classList.add('hidden');
            logEl.innerHTML =
                `<p>Topics observed:<br><ul><li>${returnedTopics.join('</li><li>')}</li></ul></p>` + logEl.innerHTML;
            // Make fetch request, to show how topics are provided in a fetch request header.
            // fetch('https://topics-demo.glitch.me/send-topics', { browsingTopics: true }).
            fetch('https://example.com/send-topics', { browsingTopics: true }).
                then(function (response) {
                    // console.log(response);
                    return response.json();
                }).then(function (j) {
                    console.log(j);
                    fetchData.innerHTML += `<p>fetch() request made with sec-browsing-topics header: ${JSON.stringify(j['sec-browsing-topics'], null, 2)}</p>` + fetchData.innerHTML;
                });
        }
    } catch (error) {
        logEl.innerHTML = 'Error: see console for details.';
        console.log('Error:', error);
    }
}


if ('browsingTopics' in document &&
    document.featurePolicy.allowsFeature('browsing-topics')) {
    console.log('🦜 document.browsingTopics():\n\n✅ Supported\n✅ Allowed');
    setInterval(getTopics, 1000);
} else {
    console.log('⚠️ document.browsingTopics() not supported.');
    logEl.innerHTML = '⚠️ Topics not supported: see Troubleshooting below.';
}

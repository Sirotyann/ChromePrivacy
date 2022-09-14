class SelectURLOperation {
    async run(urls, options) {
        //window.sharedStorage.set('data-for-month', `${new Date()}`);
        const dateForMonth = await this.sharedStorage.get('data-for-month');
        console.log(`[if data last more than a month] Today is ${new Date()}, the data stored at ${dateForMonth}`)
        const activeGroup = await this.sharedStorage.get('active-group');
        const groups = options.groups;
        console.log(JSON.stringify({ urls, options }));
        const index = Array.from(groups).findIndex(it => it === activeGroup);
        console.log(`SelectURLOperation run, find group index ${index}, activeGroup(${activeGroup}) groups(${groups})`);
        return index;
    }
}


/**
 * register(name, operation)
 * Registers a shared storage worklet operation with the provided name
 */
register('active-group', SelectURLOperation);

class SelectURLOperation {
    async run(urls, options) {
        const activeGroup = await this.sharedStorage.get('active-group');
        const groups = options.groups;
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
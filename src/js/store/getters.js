export default {
    /**
     * 取得除了指定的列表外的所有列表
     * @param st
     * @returns {function(*): Array}
     */
    localList: (st) => (exclude) => {
        const res = []
        for (let key in st.localMusicList) {
            const val = st.localMusicList[key]
            if (val.name === exclude) {
                continue
            }
            res.push(val)
        }
        return res
    },
}
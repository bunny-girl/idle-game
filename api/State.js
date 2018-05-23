import ls from 'ls-sl'

export default {
  save(val) {
    ls.save('idle_data', val)
  },
  load() {
    console.log(ls.load('idle_data'))
  }
}

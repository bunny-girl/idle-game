import ls from 'ls-sl'

export default {
  save(val) {
    ls.save('idle_data', val)
  },
  get() {
    console.log(ls.load('idle_data'))
  }
}

export default {
  required: v => !!v,
  email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
  strongPassword: v =>
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(v),
  minlen: (v, compareTo) => v && v.length >= compareTo,
  equal: (v, compareTo) => v && v === compareTo
}

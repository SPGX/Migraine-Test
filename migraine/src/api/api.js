import axios from 'axios'
import config from '../config/env'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get30: async () => {
    return await axios
      .get(`${config.api}/developers-headache/prev/30`)
      .then(async res => {
        return res
      })
      .catch(err => {
        return err
      })
  },
  get90: async () => {
    return await axios
      .get(`${config.api}/developers-headache/prev/90`)
      .then(async res => {
        return res
      })
      .catch(err => {
        return err
      })
  },
  get180: async () => {
    return await axios
      .get(`${config.api}/developers-headache/prev/180`)
      .then(async res => {
        return res
      })
      .catch(err => {
        return err
      })
  },
}

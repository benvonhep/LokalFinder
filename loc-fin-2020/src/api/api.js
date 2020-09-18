import axios from 'axios'

export default function githubApi() {
  axios.create({
    baseUrl: "http://localhost:5000"
  })
}
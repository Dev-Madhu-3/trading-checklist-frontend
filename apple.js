import axios from "axios"

const { data } = await axios.get('http://localhost:5000/health')
const res = await fetch('http://localhost:5000/health')
const resf = await res.json()

console.log(data)
console.log(resf)
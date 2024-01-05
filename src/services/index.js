import axios from "axios";

export async function getAllCalls() {
    return await axios.get("https://aircall-job.herokuapp.com/activities")
        .catch(console.log)
        .then(res => res.data)
}

export async function getCall(id) {
    return await axios.get("https://aircall-job.herokuapp.com/activities/" + id)
        .catch(console.log)
        .then(res => res.data)
}

export async function setCallArchived(id, payload) {
    return await axios.post("https://aircall-job.herokuapp.com/activities/" + id, payload)
        .catch(console.log)
        .then(res => res.data)
}

export async function resetAllCalls() {
    return await axios.get("https://aircall-job.herokuapp.com/reset")
        .catch(console.log)
        .then(res => res.data)
}
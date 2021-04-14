import React, {useEffect} from 'react';
import axios from "axios";

const fetchData = async ()=>{
    return await axios.get('https://thatcopy.pw/catapi/rest/');
}

export default function LeetCodeTree() {
    useEffect(()=>{
        fetchData().then(r=>console.log(r));
    },[])
  return (
    <div>11111</div>
  );
}

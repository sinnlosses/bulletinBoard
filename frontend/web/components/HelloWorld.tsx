import React, { useEffect, useState } from 'react'

const Helloworld = (props:any) => {

  const [msg, setMsg] = useState(props.msg);

  return (
    <div>
        <p>{msg}</p>
        <p>!!</p>
        <button onClick={() => {
        fetch('http://localhost:3001/helloworld')
        .then(response => response.json())
        .then(data => console.log(data));
        }}>ボタン</button>
    </div>
  )
}

export default Helloworld
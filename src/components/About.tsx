import React from 'react'

export default function About(props: any) {
  return (
    <div>
        <div className="ModalBlock" onClick={() => props.closeFunction(false)}></div>
        <div className="Dialog About">
            <h3>About</h3>
            <p>Welcome to the LCA stat tracking site - the only place to keep track of your LCA progress.</p>
            <h5>Here's how to join</h5>
            <ul>
                <li>Create an account <a href="http://auth.zandronum.com/">here</a>.</li>
                <li>Join any server tagged <code>LCA Stats</code>.</li>
                <li>In your console, type in <code>login username password</code>.</li>
            </ul>
        </div>
    </div>
  )
}

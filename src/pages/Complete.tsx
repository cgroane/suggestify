import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom";

const Complete = () => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        }
    }, [copied, setCopied]);
    const transformNumber = useMemo(() => {
        let phoneNumber = process.env.REACT_APP_TWILIO_PHONE_NUMBER;
        phoneNumber = `+${phoneNumber?.slice(0,1)}(${phoneNumber?.slice(1,4)})-${phoneNumber?.slice(4,7)}-${phoneNumber?.slice(7,11)}`;
        return phoneNumber;
    }, []);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(transformNumber);
        setCopied(true);
    }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">All done!</h1>
      <p className="py-6">Whenever you want to add a song to a friend's playlist, text a song link to this number:
        <div className={`tooltip copy-tooltip ${copied ? 'copy-tooltip-open' : ''}`} data-tip={'Copied!'}>
            <span onClick={copyToClipboard} className="link link-secondary pointer" >{transformNumber}</span>
        </div>
      </p>
      <Link to={'/'} className="btn btn-primary">Back to Home</Link>
    </div>
  </div>
</div>
    </>
  )
};

export default Complete;

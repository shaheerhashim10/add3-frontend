import React, { useEffect, useState } from "react";
import { IBanner } from "./banner.types";

const Banner: React.FC<IBanner> = ({ text, txHash, color = "info" }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setIsVisible(true);
  }, [text]);
  return (
    <div
    className={`${color === "success" ? 'bg-success' : color === "error" ? 'bg-error' : 'bg-info'} sticky ${isVisible ? "block" : "hidden"}`}
    >
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center">
          <div className="flex w-0 flex-1 items-center justify-center pr-4">
            <p className="ml-3 font-medium text-white">
              <span>
                {text}
                {txHash && (
                  <>
                    {" "}
                    To view transcation status on Etherscan,{" "}
                    <a
                      target="_blank"
                      href={`https://goerli.etherscan.io/tx/${txHash}`}
                      rel="noreferrer"
                    >
                      <span className="underline"> click here</span>
                    </a>
                  </>
                )}
              </span>
            </p>
          </div>
          <div onClick={() => setIsVisible(false)}>
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 17.5C13.1944 17.5 17 13.6943 17 9C17 4.30566 13.1944 0.5 8.5 0.5C3.80557 0.5 0 4.30566 0 9C0 13.6943 3.80557 17.5 8.5 17.5ZM12.2657 5.23438C12.5781 5.54663 12.5781 6.05322 12.2657 6.36572L9.63138 9L12.2657 11.6343C12.5781 11.9468 12.5781 12.4534 12.2657 12.7656C11.9533 13.0781 11.4467 13.0781 11.1343 12.7656L8.5 10.1313L5.86569 12.7656C5.55328 13.0781 5.04675 13.0781 4.73431 12.7656C4.42191 12.4534 4.42191 11.9468 4.73431 11.6343L7.36862 9L4.73431 6.36572C4.42191 6.05322 4.42191 5.54663 4.73431 5.23438C5.04672 4.92188 5.55325 4.92188 5.86569 5.23438L8.5 7.86865L11.1343 5.23438C11.4467 4.92188 11.9533 4.92188 12.2657 5.23438Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

"use client";

import { useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";


export default function CopyText({ text, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // 1.5 sec পর আবার icon normal করা
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      alert("Copy failed");
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-2.5 cursor-pointer ${className}`}
      onClick={handleCopy}
      title="Click to copy"
    >
      {/* Text */}
      <span>{text}</span>

      {/* Icon */}
      {copied ? (
        <FaCheck className="text-green-600" />
      ) : (
        <FaRegCopy className="text-gray-500 hover:text-gray-800" />
      )}
    </span>
  );
}

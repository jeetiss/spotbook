import React from "react";

export const Widget = ({ onFileSelect, onChange }) => (
  <button
    onClick={() => {
      // "Uploading"
      onFileSelect();

      // "Uploaded"
      setTimeout(
        () =>
          onChange({
            originalUrl:
              "https://ucarecdn.com/2425c2b5-71f9-4079-b0f2-69bcd03b9173/",
          }),
        500
      );
    }}
  >
    Choose a file
  </button>
);

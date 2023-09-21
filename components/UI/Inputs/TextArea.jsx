import React from "react";

const TextArea = (props) => {
  const { className, children, onChange, label, errormessage, ...rest } = props;
  const handleOnChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full gap-3">
      {label && <label className="font-semibold text-md">{label}</label>}
      <textarea
        className="w-full bg-gray-100 border border-zinc-200 p-4 rounded-2xl focus:outline-zinc-300 min-h-[250px]"
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      {errormessage && (
        <span className="text-xs text-right text-red-500 error-message">
          {errormessage}
        </span>
      )}
    </div>
  );
};

export default TextArea;

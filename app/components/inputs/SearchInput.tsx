"use client";

interface SearchInputProps {
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <div
      className="
        rounded-lg 
        px-5 
        py-2
   "
    >
      <input
        className="
          w-full
          outline-none
          transition
          peer
          shadow-[0px_0px_7px_2px_rgba(0,0,0,0.15)]
          rounded-lg 
          p-4
          border-2
          focus:border-sky-400
          text-sm
        "
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;

"use client";

interface CheckboxProps {
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange }) => {
  return (
    <div>
      <input
        onChange={onChange}
        type="checkbox"
        className="
              w-6 
              h-6
              border-4
              flex
              ml-6
            "
      />
    </div>
  );
};

export default Checkbox;

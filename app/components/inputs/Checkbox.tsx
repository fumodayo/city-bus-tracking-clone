"use client";

interface CheckboxProps {
  onChange: () => void;
  checked?: boolean;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked, disabled }) => {
  return (
    <div>
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="
              w-6 
              h-6
              border-4
              flex
              ml-6
            "
        disabled={disabled}
      />
    </div>
  );
};

export default Checkbox;

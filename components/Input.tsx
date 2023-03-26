interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      onChange={onChange}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      className=" w-full p-4 text-lg bg-blacke border-neutral-800
      rounded-md 
      outline-none 
      text-white 
      focus:border-sky-500 focus:border-2 
      transition disabled:bg-neutral-900 
      disable:opacity-70 disabled:cursor-not-allowed"
    />
  );
};

export default Input;

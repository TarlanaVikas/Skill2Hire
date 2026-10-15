const Input = ({ icon: Icon, className = '', ...props }) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52665F]"
          size={18}
        />
      )}
      <input
        className={`input-s2h w-full ${Icon ? 'pl-11' : 'px-4'} ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;

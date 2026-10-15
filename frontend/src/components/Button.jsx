const VARIANTS = {
  primary: 'bg-[#0A7F72] text-white hover:bg-[#086A5F] hover:-translate-y-0.5 shadow-[0_8px_22px_rgba(10,127,114,0.28)]',
  dark: 'bg-[#062C30] text-white hover:bg-[#041F22] hover:-translate-y-0.5 hover:shadow-lg',
  ghost: 'bg-white text-[#062C30] border border-[#DCE5E3] hover:border-[#0A7F72] hover:text-[#0A7F72]',
};

const Button = ({ variant = 'primary', children, className = '', ...props }) => {
  const base = 'font-semibold cursor-pointer transition-all duration-200 rounded-[10px] px-6 py-3 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <button className={`${base} ${VARIANTS[variant] || VARIANTS.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

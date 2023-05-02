import React from "react";

export enum ButtonVariant {
  Primary,
  Success,
  Danger,
  Warning,
  Info,
  Disabled,
}

const Button = ({
  variant,
  children,
  className,
  ...rest
}: {
  variant: ButtonVariant;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) => {
  const colors = {
    [ButtonVariant.Primary]:
      "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
    [ButtonVariant.Success]:
      "bg-green-700 hover:bg-green-800 focus:ring-green-300",
    [ButtonVariant.Danger]: "bg-red-600 hover:bg-red-700 focus:ring-red-300",
    [ButtonVariant.Warning]:
      "bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300",
    [ButtonVariant.Info]:
      "bg-purple-700 hover:bg-purple-800 focus:ring-purple-300",
    [ButtonVariant.Disabled]: "bg-gray-700 focus:ring-gray-300",
  };
  return (
    <button
      className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 ${
        colors[variant]
      } ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button };

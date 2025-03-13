import React from "react";

export function Tabs({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function TabsList({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, children, ...props }: TabsTriggerProps) {
  return (
    <button data-value={value} {...props}>
      {children}
    </button>
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, children, ...props }: TabsContentProps) {
  return (
    <div data-value={value} {...props}>
      {children}
    </div>
  );
}
